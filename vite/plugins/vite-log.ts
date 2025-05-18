import { PluginOption } from "vite";

type LogType = "info" | "warn" | "error" | "debug";

type NodeLogFn = (message?: unknown, ...optionalParams: unknown[]) => void;

function getLogFn(type?: LogType): NodeLogFn {
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

/**
 * Logging middleware registered on /vite-log, which allows
 * logs to be passed from client to server during development.
 *
 * Useful for debugging app on devices where the developer
 * console log messages are not easily accessible (e.g. mobile).
 */
const log: PluginOption = {
  name: "vite-log-middleware",
  configureServer(server) {
    server.middlewares.use("/vite-log", (req, res) => {
      let payload = "";
      req.on("data", (chunk) => (payload += chunk));
      req.on("end", () => {
        try {
          const { message, type, optionalParams } = JSON.parse(payload);

          const logFn = getLogFn(type);
          const logMsn = `client ${type}: ${message}`;

          if (optionalParams?.length) {
            logFn(logMsn, optionalParams);
          } else {
            logFn(logMsn);
          }
          res.end("Log received");
        } catch {
          console.error("Attempt to log malformed data");
          res.end("Log malformed");
        }
      });
    });
  },
};

export default log;
