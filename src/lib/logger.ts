import { createLogger, format, transports } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import path from "path";

const logDir = path.join(process.cwd(), "src", "logs");

const logger = createLogger({
  level: process.env.LOG_LEVEL || "error",
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  defaultMeta: { service: "next-app" },
  transports: [
    new transports.Console({
      format: format.combine(format.colorize(), format.simple()),
    }),
    new DailyRotateFile({
      filename: `${logDir}/error-%DATE%.log`,
      level: "error",
      datePattern: "YYYY-MM-DD",
      maxSize: "5m",
      maxFiles: "14d",
      zippedArchive: true,
    }),
  ],
});

export default logger;
