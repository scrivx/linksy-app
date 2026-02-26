const API_URL = import.meta.env.PUBLIC_API_URL || 'http://localhost:3000';

export interface LinkResponse {
  shortUrl: string;
  data: {
    id: string;
    alias: string;
    original_url: string;
    created_at: string;
  };
}

export interface LinkError {
  error: string | Array<{ path: string[]; message: string }>;
}

export async function createLink(
  url: string,
  alias: string,
): Promise<LinkResponse | LinkError> {
  try {
    const response = await fetch(`${API_URL}/api/links`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url, alias }),
    });

    const data = await response.json();

    if (!response.ok) {
      return { error: data.error || 'Error creando el link' };
    }

    return data;
  } catch (error) {
    return { error: 'Error de conexión con la API' };
  }
}

export async function getLinkDetails(alias: string) {
  try {
    const response = await fetch(`${API_URL}/api/links/${alias}`);
    return await response.json();
  } catch (error) {
    return { error: 'Error obteniendo detalles del link' };
  }
}

export async function getStats(alias: string) {
  try {
    const response = await fetch(`${API_URL}/api/links/${alias}/stats`);
    return await response.json();
  } catch (error) {
    return { error: 'Error obteniendo estadísticas' };
  }
}
