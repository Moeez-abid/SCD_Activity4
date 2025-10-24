const request = require('supertest');
const { app, resetStore } = require('./sum');

beforeEach(() => {
  resetStore();
});

test('POST /add returns sum', async () => {
  const res = await request(app).post('/add').send({ a: 2, b: 3 });
  expect(res.status).toBe(200);
  expect(res.body.result).toBe(5);
});

test('POST /multiply returns product', async () => {
  const res = await request(app).post('/multiply').send({ a: 3, b: 4 });
  expect(res.status).toBe(200);
  expect(res.body.result).toBe(12);
});

test('create calculation and delete it', async () => {
  const create = await request(app)
    .post('/calculations')
    .send({ op: 'add', a: 4, b: 6 });
  expect(create.status).toBe(201);
  expect(create.body).toHaveProperty('id');

  const id = create.body.id;
  const del = await request(app).delete(`/calculations/${id}`);
  expect(del.status).toBe(204);
});
