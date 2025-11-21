const DEFAULT_HOST = "divya.happyenterprises.org";

const ENV_HOST = import.meta.env?.VITE_API_HOST || DEFAULT_HOST;

const normalizeHost = (host) => {
  if (!host) {
    return DEFAULT_HOST;
  }
  return host.replace(/^(https?:\/\/)/i, "").replace(/\/+$/, "");
};

const host = normalizeHost(ENV_HOST);

export const API_BASE_URL = `https://${host}`;


export const withBaseUrl = (path = "") => {
  if (!path) {
    return API_BASE_URL;
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE_URL}${normalizedPath}`;
};

