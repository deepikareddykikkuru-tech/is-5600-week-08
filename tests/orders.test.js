const productTestHelper = require('./test-utils/productTestHelper')
const { create, list, get, edit } = require('../orders')

describe('Order Module', () => {
  beforeAll(async () => {
    await productTestHelper.setupTestData()
  }, 20000)

  afterAll(async () => {
    await productTestHelper.cleanupTestData()
  }, 20000)

  test('should create and retrieve an order', async () => {
    const productId = productTestHelper.testProductIds[0]
    const orderFields = {
      buyerEmail: 'integration@test.com',
      products: [productId]
    }

    const order = await create(orderFields)
    expect(order).toHaveProperty('_id')
    expect(order.buyerEmail).toBe(orderFields.buyerEmail)
    expect(Array.isArray(order.products)).toBe(true)
    expect(order.products.length).toBeGreaterThan(0)

    const loadedOrder = await get(order._id)
    expect(loadedOrder).not.toBeNull()
    expect(loadedOrder.buyerEmail).toBe(orderFields.buyerEmail)

    productTestHelper.testOrderIds.push(order._id)
  })

  test('should list orders by productId', async () => {
    const productId = productTestHelper.testProductIds[0]
    const orders = await list({ productId })
    expect(Array.isArray(orders)).toBe(true)
  })

  test('should edit order status', async () => {
    const productId = productTestHelper.testProductIds[0]
    const order = await create({
      buyerEmail: 'edit@test.com',
      products: [productId],
      status: 'CREATED'
    })

    productTestHelper.testOrderIds.push(order._id)
    const updated = await edit(order._id, { status: 'COMPLETED' })
    expect(updated.status).toBe('COMPLETED')
  })
})
