import type {
  ApiErrorResponse,
  CreateLinkInput,
  CreateLinkResponse,
  LinkStatsResponse,
} from '@linksy/shared';

const API_URL = import.meta.env.PUBLIC_API_URL;
const TIMEOUT_MS = 10_000;

export type LinkResponse = CreateLinkResponse;
export type LinkError = ApiErrorResponse;

const normalizeUrl = (raw: string): string => {
  const trimmed = raw.trim();
  if (!trimmed) return trimmed;
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
};

const messageForStatus = (status: number): string => {
  if (status === 409) return 'Ese alias ya está en uso. Prueba con otro.';
  if (status === 404) return 'Recurso no encontrado.';
  if (status === 429) return 'Demasiadas peticiones. Espera un momento.';
  if (status >= 500) return 'El servidor tuvo un problema. Intenta más tarde.';
  return 'No se pudo crear el enlace.';
};

async function requestJson<T>(
  input: RequestInfo | URL,
  init: RequestInit = {},
): Promise<T | ApiErrorResponse> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(input, { ...init, signal: controller.signal });
    const data = (await response.json().catch(() => null)) as
      | Partial<ApiErrorResponse & T>
      | null;

    if (!response.ok) {
      return {
        error: data?.error ?? messageForStatus(response.status),
      };
    }
    return (data ?? {}) as T;
  } catch (error: unknown) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      return { error: 'La petición tardó demasiado. Intenta de nuevo.' };
    }
    return { error: 'No se pudo conectar con la API. Verifica tu conexión.' };
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function createLink(
  url: string,
  alias: string,
): Promise<LinkResponse | LinkError> {
  const body: CreateLinkInput = { url: normalizeUrl(url), alias: alias.trim() };
  return requestJson<CreateLinkResponse>(`${API_URL}/api/links`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

export async function getLinkDetails(alias: string) {
  return requestJson(`${API_URL}/api/links/${encodeURIComponent(alias)}`);
}

export async function getStats(alias: string) {
  return requestJson<LinkStatsResponse>(
    `${API_URL}/api/links/${encodeURIComponent(alias)}/stats`,
  );
}
