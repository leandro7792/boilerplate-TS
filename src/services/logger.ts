import winston, { createLogger, format, transports } from 'winston';
import 'winston-daily-rotate-file';

const transport = new winston.transports.DailyRotateFile({
  filename: 'log-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  dirname: `${process.cwd()}/logs`,
  maxSize: '20m',
  maxFiles: '14d',
});

// transport.on('rotate', function(oldFilename, newFilename) {
//   // ver depois
// });

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json(),
  ),
  transports: [transport],
});

// If we're not in production then **ALSO** log to the `console`
// with the colorized simple format.
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      format: format.combine(format.colorize(), format.simple()),
    }),
  );
}

export default logger;
