import { Logger, LoggerOptions, transports } from "winston";

const httpTransportOptions = {
    host: "http-intake.logs.datadoghq.com",
    path: `/api/v2/logs?dd-api-key=${process.env.DATADOG_API_KEY}&ddsource=nodejs&service=${process.env.APPLICATION_NAME}`,
    ssl: true
};
  

const options: LoggerOptions = {
    transports: [
        new transports.Console({
            level: process.env.NODE_ENV === "production" ? "error" : "debug"
        }),
        new transports.File({ filename: "debug.log", level: "debug" }),
        new transports.Http(httpTransportOptions)
    ]
};

const logger = new Logger(options);

if (process.env.NODE_ENV !== "production") {
    logger.debug("Logging initialized at debug level");
}

export default logger;
