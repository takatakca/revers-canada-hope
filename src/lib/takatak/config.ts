import "@tanstack/react-start/server-only";

export type TakatakConfig = {
  launchUrl: string;
  apiBaseUrl: string;
  serviceToken: string;
  hmacSecret: string;
  sessionSecret: string;
};

export function getTakatakConfig(): TakatakConfig {
  return {
    launchUrl:
      process.env.TAKATAK_EXPERIENCE_LAUNCH_URL?.trim() ||
      "https://takatak.ca/api/experiences/revers/launch",
    apiBaseUrl: (process.env.TAKATAK_API_BASE_URL?.trim() || "https://takatak.ca").replace(
      /\/$/,
      "",
    ),
    serviceToken: process.env.TAKATAK_REVERS_SERVICE_TOKEN?.trim() || "",
    hmacSecret: process.env.TAKATAK_REVERS_HMAC_SECRET?.trim() || "",
    sessionSecret: process.env.REVERS_SESSION_SECRET?.trim() || "",
  };
}

export function assertHttpsUrl(raw: string, label: string): URL {
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    throw new Error(`${label} is not a valid URL`);
  }

  if (url.protocol !== "https:") {
    throw new Error(`${label} must use HTTPS`);
  }

  return url;
}
