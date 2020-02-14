import test, { TestContext } from 'ava';

test('sample test', async (t: TestContext) => {
  const message: string = 'world';
  t.is(message, 'world');
});
