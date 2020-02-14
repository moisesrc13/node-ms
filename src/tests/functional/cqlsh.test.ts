import * as bunyan from 'bunyan';
import { test, AssertContext } from 'ava';
import * as shell from 'shelljs';

const log: bunyan = bunyan.createLogger({ name: 'server' });

test('Test cqlsh is installed', async (t: AssertContext) => {
    let result = shell.exec('cqlsh --help')
    if(result.code == 0){
        log.info(`cqlsh is installed. The output of cqlsh --help is: ${result.stdout}`);
        t.pass();
    }else{
        log.error(`cqlsh --help returned a non-zero exit code.  Something went wrong ${result.stderr}`);
        t.fail();
    }
});
