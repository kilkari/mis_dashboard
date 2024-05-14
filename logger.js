const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} : [${label}] : ${level} : ${message}`;
});

const logger = new createLogger({
    format: combine(
        label({ label: "Kilkari" }),
        timestamp(),
        format.splat(),
        format.json(),
        format.printf((info) => {
            return `${info.timestamp} - ${info.level}:  [${info.label}]: ${
                info.message
            } ${JSON.stringify(info.metadata)}`;
        }),
        myFormat
    ),
    transports: [new transports.Console()]
});


module.exports = { logger };
