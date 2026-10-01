const { test } = require('node:test');
const assert = require('node:assert/strict');
const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('config');
const Post = require('../models/Post');
const User = require('../models/User');
// Run the real router and validation against in-memory model methods; never connect to MongoDB.
test('post and comment API lifecycle, ownership, validation and missing IDs', async t => {
  const records = new Map();
  const owner = '507f1f77bcf86cd799439011';
  const other = '507f1f77bcf86cd799439012';
  t.mock.method(User, 'findById', id => ({ select: async () => ({ _id: id, name: 'Test Developer', avatar: '' }) }));
  t.mock.method(Post.prototype, 'save', async function () { records.set(this.id, this); return this; });
  t.mock.method(Post.prototype, 'deleteOne', async function () { records.delete(this.id); });
  t.mock.method(Post, 'findById', async id => records.get(id) || null);
  t.mock.method(Post, 'find', () => ({ sort: async () => Array.from(records.values()) }));
  const app = express();
  app.use(express.json());
  app.use('/api/posts', require('../routes/api/posts'));
  const server = await new Promise(resolve => { const s = app.listen(0, '127.0.0.1', () => resolve(s)); });
  t.after(() => new Promise(resolve => server.close(resolve)));
  const call = async (method, path = '', body, user = owner) => {
    const headers = { 'Content-Type': 'application/json' };
    if (user) headers['x-auth-token'] = jwt.sign({ user: { id: user } }, config.get('jwtSecret'));
    const response = await fetch('http://127.0.0.1:' + server.address().port + '/api/posts' + path, { method, headers, body: body === undefined ? undefined : JSON.stringify(body) });
    return { status: response.status, body: await response.json() };
  };
  assert.equal((await call('GET', '', undefined, null)).status, 401);
  assert.equal((await call('POST', '', { text: '   ' })).status, 400);
  const created = await call('POST', '', { text: 'Hello developers' });
  assert.equal(created.status, 200);
  const id = created.body._id;
  assert.equal((await call('GET')).body.length, 1);
  assert.equal((await call('GET', '/' + id)).body.text, 'Hello developers');
  assert.equal((await call('PUT', '/like/' + id)).body.length, 1);
  assert.equal((await call('PUT', '/like/' + id)).status, 400);
  assert.equal((await call('PUT', '/unlike/' + id)).body.length, 0);
  assert.equal((await call('PUT', '/unlike/' + id)).status, 400);
  assert.equal((await call('POST', '/comment/' + id, { text: ' ' })).status, 400);
  const comment = (await call('POST', '/comment/' + id, { text: 'Reply' })).body[0];
  assert.equal(comment.text, 'Reply');
  assert.equal((await call('DELETE', '/comment/' + id + '/' + comment._id, undefined, other)).status, 401);
  assert.equal((await call('DELETE', '/comment/' + id + '/' + comment._id)).body.length, 0);
  assert.equal((await call('DELETE', '/comment/' + id + '/' + comment._id)).status, 404);
  assert.equal((await call('DELETE', '/' + id, undefined, other)).status, 401);
  assert.equal((await call('DELETE', '/' + id)).status, 200);
  for (const path of [id, 'invalid-id']) {
    assert.equal((await call('GET', '/' + path)).status, 404);
    assert.equal((await call('PUT', '/like/' + path)).status, 404);
    assert.equal((await call('PUT', '/unlike/' + path)).status, 404);
    assert.equal((await call('POST', '/comment/' + path, { text: 'Reply' })).status, 404);
    assert.equal((await call('DELETE', '/comment/' + path + '/' + comment._id)).status, 404);
  }
});
