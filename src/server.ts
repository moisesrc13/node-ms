import * as bunyan from 'bunyan';
import { App } from './app';

const log: bunyan = bunyan.createLogger({ name: 'server' });

const options = {
  port: 8000,
  baseUrl: '/',
  apiVersion: '1.0.0',
  apiName: 'apiName',
};

const app = new App(options).server;

const server = app.listen(options.port, () => {
  log.info('Server instance is listening at %s', options.port);
});

server.on('error', (error) => {
  // options.appVersion, options.port
  const { apiVersion, port } = options;

  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? `Pipe ${port}`
    : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      log.error(`${apiVersion}: ${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      log.error(`${apiVersion}: ${bind} is already in use`);
      process.exit(1);
      break;
    case 'EADDRNOTAVAIL':
      log.error(`${apiVersion}: ${bind} is not an available address`);
      process.exit(1);
      break;
    default:
      throw error;
  }
});
server.on('listening', () => {
  const { apiVersion } = options;
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? `pipe ${addr}`
    : `port ${addr.port}`;

  log.info(`${apiVersion}: Listening on ${bind}`);
});
