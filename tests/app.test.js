const request = require('supertest')
const app = require('../app')

describe('The Express Server', () => {
  beforeAll(done => {
    done()
  })

  test('should return response', async () => {
    const res = await request(app).get('/')
    expect(res.statusCode).toEqual(200)
  })

  test('should respond at /products', async () => {
    const res = await request(app).get('/products')
    expect(res.statusCode).toEqual(200)
    expect(Array.isArray(res.body)).toBe(true)
  })

  test('should respond at /orders', async () => {
    const res = await request(app).get('/orders')
    expect(res.statusCode).toEqual(200)
    expect(Array.isArray(res.body)).toBe(true)
  })
})
