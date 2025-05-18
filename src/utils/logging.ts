export type LogType = "info" | "warn" | "error" | "debug";
type LogFn = (
  type: LogType,
  message?: unknown,
  ...optionalParams: unknown[]
) => void;
type NodeLogFn = (message?: unknown, ...optionalParams: unknown[]) => void;

export const log: LogFn = (type, message, ...optionalParams) => {
  if (!import.meta.env.DEV) return;
  const params = optionalParams.length ? optionalParams : undefined;

  getLogFn(type)(message, params);

  fetch("/vite-log", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type,
      message,
      optionalParams: params,
    }),
  });
};

function getLogFn(type: LogType): NodeLogFn {
  switch (type) {
    case "debug":
      return console.debug;
    case "error":
      return console.error;
    case "warn":
      return console.debug;
    case "info":
    default:
      return console.info;
  }
}

export default {
  log,
};
