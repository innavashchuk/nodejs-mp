import winston from 'winston';
import expressWinston from 'express-winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

// NOTE: it would be useful to log something that indicates WHO made the request

export const loggerMiddleware = expressWinston.logger({
  winstonInstance: logger,
  expressFormat: true,
  colorize: false,
  meta: true,
  msg: 'HTTP {{req.method}} {{req.url}} responded with status {{res.statusCode}} in {{res.responseTime}} ms',
});
