import winston from "winston";

const colorizer = winston.format.colorize();

let customFormat = winston.format.combine(
    winston.format.timestamp({
        format: 'YY-MM-DD HH:mm:ss'
    }),
    winston.format.printf((msg) => {
        return winston.format.colorize()
        .colorize(msg.level, `[${msg.timestamp}] [${msg.level.toUpperCase()}]${msg.context ? ` (${msg.context})`:``} ${msg.message}`)
    })
)

const logger = winston.createLogger({
    level: 'silly',
    transports: [
        new (winston.transports.Console)({
            format: customFormat
        })
    ]
})

winston.addColors({
    info: 'blue',
    debug: 'green',
    warning: 'yellow',
    error: 'red'
})

export default logger