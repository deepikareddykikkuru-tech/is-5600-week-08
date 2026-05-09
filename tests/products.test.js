const productTestHelper = require('./test-utils/productTestHelper')
const { list, get, create, destroy } = require('../products')

describe('Product Module', () => {
  beforeAll(async () => {
    await productTestHelper.setupTestData()
  }, 20000)

  afterAll(async () => {
    await productTestHelper.cleanupTestData()
  }, 20000)

  test('should list all products', async () => {
    const products = await list()
    expect(products.length).toBeGreaterThan(0)
  })

  test('should create, fetch, and delete a product', async () => {
    const newProduct = {
      description: 'Test product description',
      likes: 10,
      urls: {
        regular: 'https://example.com/regular.jpg',
        small: 'https://example.com/small.jpg',
        thumb: 'https://example.com/thumb.jpg'
      },
      links: {
        self: 'https://example.com/self',
        html: 'https://example.com/html'
      },
      user: {
        id: 'user1',
        first_name: 'Test',
        username: 'testuser'
      },
      tags: [{ title: 'test' }]
    }

    const created = await create(newProduct)
    expect(created).toHaveProperty('_id')
    expect(created.likes).toBe(10)

    const found = await get(created._id)
    expect(found).not.toBeNull()
    expect(found._id).toBe(created._id)

    await destroy(created._id)
  })
})
