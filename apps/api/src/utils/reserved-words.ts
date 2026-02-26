const RESERVED_WORDS = [
  "api",
  "admin",
  "stats",
  "login",
  "logout",
  "dashboard",
  "settings",
  "profile",
  "auth",
  "static",
  "public",
  "health",
  "metrics",
];

export const isReserved = (alias: string): boolean => {
  return RESERVED_WORDS.includes(alias.toLowerCase());
};
