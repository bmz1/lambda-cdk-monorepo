import { createLogger, format, transports } from "winston";

export const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp(),
    format.printf(({ level, message, timestamp, ...meta }) => {
      const payload = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : '';
      return `[${level.toUpperCase()}] ${timestamp}: ${message}${payload}`;
    })
  ),
  transports: [
    new transports.Console()
  ],
});

// Example usage with optional payload
export const logInfo = (message: string, payload?: Record<string, any>) => 
  logger.info(message, payload);

export const logError = (message: string, payload?: Record<string, any>) => 
  logger.error(message, payload);

// Example usage:
// logInfo("User logged in", { userId: "123", ip: "192.168.1.1" });
// Output: [INFO] 2024-01-05T10:30:45Z: User logged in {"userId":"123","ip":"192.168.1.1"}
// logError("Failed to process", { error: "timeout", attempt: 3 });
// Output: [ERROR] 2024-01-05T10:30:46Z: Failed to process {"error":"timeout","attempt":3}