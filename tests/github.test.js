const { test } = require('node:test');
const assert = require('node:assert/strict');
const express = require('express');
const http = require('node:http');
test('Github route handles repositories, missing users, rate limits and timeouts', async t => {
  const fetchMock = t.mock.method(global, 'fetch', async () => ({ ok: true, json: async () => [{ id: 1, name: 'example' }] }));
  const app = express();
  app.use('/api/profile', require('../routes/api/profile'));
  const server = await new Promise(resolve => { const s = app.listen(0, '127.0.0.1', () => resolve(s)); });
  t.after(() => new Promise(resolve => server.close(resolve)));
  const get = username => new Promise((resolve, reject) => {
    http.get('http://127.0.0.1:' + server.address().port + '/api/profile/github/' + username, res => {
      let body = '';
      res.on('data', chunk => { body += chunk; });
      res.on('end', () => resolve({ status: res.statusCode, body: JSON.parse(body) }));
    }).on('error', reject);
  });
  assert.equal((await get('octocat')).body[0].name, 'example');
  const [url] = fetchMock.mock.calls[0].arguments;
  assert.ok(!url.includes('client_secret'));
  assert.ok(url.includes('sort=created&direction=desc'));
  assert.equal((await get('invalid!')).status, 400);
  fetchMock.mock.mockImplementation(async () => ({ ok: false, status: 404 }));
  assert.equal((await get('missing')).status, 404);
  fetchMock.mock.mockImplementation(async () => ({ ok: false, status: 403 }));
  assert.equal((await get('octocat')).status, 502);
  fetchMock.mock.mockImplementation(async () => { throw new Error('timeout'); });
  assert.equal((await get('octocat')).status, 502);
});
