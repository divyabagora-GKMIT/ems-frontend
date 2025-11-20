const DEFAULT_HOST = "65.2.160.107:8080";

const ENV_HOST = import.meta.env?.VITE_API_HOST || DEFAULT_HOST;

const normalizeHost = (host) => {
  if (!host) {
    return DEFAULT_HOST;
  }
  return host.replace(/^(https?:\/\/)/i, "").replace(/\/+$/, "");
};

const host = normalizeHost(ENV_HOST);

export const API_BASE_URL = `http://${host}`;

export const withBaseUrl = (path = "") => {
  if (!path) {
    return API_BASE_URL;
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE_URL}${normalizedPath}`;
};

