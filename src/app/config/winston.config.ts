import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import { env } from './env.config.js';

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
  verbose: 4,
  silly: 5,
};

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  debug: 'blue',
  verbose: 'gray',
  silly: 'gray',
};

winston.addColors(colors);

const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.printf(({ level, message, timestamp, stack }) => {
    const stackTrace = stack ? `\n${stack}` : '';
    return `[${timestamp}] [${level.toUpperCase()}]: ${message}${stackTrace}`;
  })
);

const transports: winston.transport[] = [
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      winston.format.printf(({ level, message, timestamp }) => {
        return `[${timestamp}] [${level}]: ${message}`;
      })
    ),
  }),
];

if (env.NODE_ENV !== 'test') {
  transports.push(
    new DailyRotateFile({
      filename: 'logs/error/%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxSize: '20m',
      maxFiles: '14d',
      level: 'error',
      format,
    }),
    new DailyRotateFile({
      filename: 'logs/combined/%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxSize: '20m',
      maxFiles: '14d',
      format,
    })
  );
}

export const logger = winston.createLogger({
  levels,
  level: env.LOG_LEVEL,
  transports,
  exceptionHandlers: [
    new DailyRotateFile({
      filename: 'logs/exceptions/%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
  rejectionHandlers: [
    new DailyRotateFile({
      filename: 'logs/rejections/%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
});

export default logger;
