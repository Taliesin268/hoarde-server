import winston from "winston";

const colorizer = winston.format.colorize();

let customFormat = winston.format.combine(
    winston.format.timestamp({
        format: 'YY-MM-DD HH:mm:ss'
    }),
    winston.format.printf((msg) => {
        return winston.format.colorize()
            .colorize(msg.level, `[${msg.timestamp}] [${msg.level.toUpperCase()}]${msg.context ? ` (${msg.context})` : ``} ${msg.message}`)
    })
)

const logger = winston.createLogger({
    level: 'silly',
    transports: [
        new (winston.transports.Console)({
            format: customFormat
        })
    ],
    levels: {
        fatal: 0,
        error: 1,
        warn: 2,
        server: 3,
        info: 4,
        verbose: 5,
        debug: 6,
        trace: 7,
        silly: 8 
    },
})

winston.addColors({
    fatal: 'redBG',
    error: 'red',
    warn: 'yellow',
    server: 'blueBG',
    info: 'blue',
    verbose: 'cyan',
    debug: 'green',
    trace: 'white',
    silly: 'gray'
})

export default logger