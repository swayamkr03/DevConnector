const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const { spawnSync } = require('node:child_process');

async function serve(t, environment) {
  const previous = process.env.NODE_ENV;
  process.env.NODE_ENV = environment;
  const entry = require.resolve('../server');
  delete require.cache[entry];
  const app = require(entry);
  if (previous === undefined) delete process.env.NODE_ENV;
  else process.env.NODE_ENV = previous;
  const server = await new Promise(resolve => {
    const instance = app.listen(0, '127.0.0.1', () => resolve(instance));
  });
  t.after(() => new Promise(resolve => server.close(resolve)));
  return 'http://127.0.0.1:' + server.address().port;
}

test('production serves React routes and assets without swallowing API requests', async t => {
  const base = await serve(t, 'production');
  for (const route of ['/', '/profiles', '/profile/test-user', '/posts/test-post', '/dashboard', '/login', '/register', '/create-profile', '/edit-profile', '/add-experience', '/add-education']) {
    const response = await fetch(base + route);
    assert.equal(response.status, 200, route);
    assert.match(response.headers.get('content-type'), /text\/html/);
    assert.match(await response.text(), /<div id="root"><\/div>/);
  }
  const manifest = require('../client/build/asset-manifest.json');
  for (const asset of [manifest.files['main.js'], manifest.files['main.css']]) {
    const response = await fetch(base + asset);
    assert.equal(response.status, 200, asset);
    assert.doesNotMatch(response.headers.get('content-type'), /text\/html/);
  }
  const unauthorized = await fetch(base + '/api/auth');
  assert.equal(unauthorized.status, 401);
  assert.match(unauthorized.headers.get('content-type'), /application\/json/);
  for (const method of ['GET', 'POST']) {
    const response = await fetch(base + '/api/not-a-real-route', { method });
    assert.equal(response.status, 404);
    assert.deepEqual(await response.json(), { msg: 'API route not found' });
  }
  assert.equal((await fetch(base + '/static/missing.js')).status, 404);
});

test('development keeps the existing API root response', async t => {
  const base = await serve(t, 'development');
  const response = await fetch(base + '/');
  assert.equal(await response.text(), 'API Running');
});

test('production config works with environment variables and no private default.json', () => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'devconnector-config-test-'));
  try {
    fs.copyFileSync(path.join(__dirname, '../config/custom-environment-variables.json'), path.join(directory, 'custom-environment-variables.json'));
    const result = spawnSync(process.execPath, ['-e', `
      const assert = require('node:assert/strict');
      const config = require('config');
      assert.equal(config.get('mongoURI'), 'mongodb://127.0.0.1:27017/deployment-test');
      assert.equal(config.get('jwtSecret'), 'test-only-not-a-real-secret');
    `], {
      cwd: path.join(__dirname, '..'),
      env: { ...process.env, NODE_ENV: 'production', NODE_CONFIG_DIR: directory, NODE_CONFIG: '{}',
        MONGO_URI: 'mongodb://127.0.0.1:27017/deployment-test', JWT_SECRET: 'test-only-not-a-real-secret' },
      encoding: 'utf8'
    });
    assert.ifError(result.error);
    assert.equal(result.status, 0, result.stderr);
  } finally {
    fs.unlinkSync(path.join(directory, 'custom-environment-variables.json'));
    fs.rmdirSync(directory);
  }
});
