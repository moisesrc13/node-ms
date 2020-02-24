
import * as restify from 'restify';

export class App {
  server;
  settings;

  apiVersion: string = '0.0.0';
  baseUrl: string = '';

  constructor(settings: any) {
    const { baseUrl, apiVersion } = settings;
    this.apiVersion = apiVersion;
    this.baseUrl = baseUrl;
    this.server = restify.createServer({
      name: settings.apiName,
    });
    this.mountRoutes();
  }

  private mountRoutes() {
    this.server.get({ path: '/health', version: this.apiVersion }, this.handleHealth());
    this.server.get({ path: '/health/ping', version: this.apiVersion }, this.handleHealth());
  }

  private handleHealth() {
    return (req, res, next) => {
      res.send('Moy - test');
    };
  }
}
