import * as bunyan from 'bunyan';
import { test, AssertContext } from 'ava';

const log: bunyan = bunyan.createLogger({ name: 'server' });

const environment: string = process.env.ENVIRONMENT;
const ingress: string = process.env.INGRESS_HOSTNAME;
const host: string = process.env.SERVICE_HOSTNAME;

log.info(`The environment is set to: ${environment}`);
log.info(`The ingress hostname is set to: ${ingress}`);
log.info(`The service hostname is set to: ${host}`);

test('Test environment variables', async (t: AssertContext) => {
  if (!environment || !ingress || !host) {
    log.info('One of the required environment variables for testing is not set.  See above console output.');
    t.fail();
  } else {
    t.pass();
  }
});
