const chai = require('chai')
chai.use(require('chai-http'))
const expect = chai.expect
const db = require('../lib/db')
const app = require('../app')
const url = require('url')



// rewrite tests to reflect users table!



describe("/users", () => {
  describe("GET /users", () => {

    beforeEach(() => db.init())

    it("renders a 200 with the a list of users", async () => {
      const product1 = db.products.insert({ name: 'Mediocre Iron Watch', priceInCents: 399 })
      const product2 = db.products.insert({ name: 'Heavy Duty Concrete Plate', priceInCents: 499 })

      db.products.insert({ name: 'Some other, non-included one', priceInCents: 4999 })

      const item1 = db.users.insert({ product_id: 1, quantity: 2 })
      const item2 = db.users.insert({ product_id: 2, quantity: 3 })

      const response = await chai.request(app).get('/users')
      const port = url.parse(response.request.url).port

      expect(response).to.have.status(200)
      expect(response).to.be.json
      expect(response.body).to.deep.eq({
        _links: {
          self: {
            href: `http://127.0.0.1:${port}/users`
          }
        },
        _embedded: {
          users: [
            {
              id: item1.id,
              quantity: 2,
              product: {
                ref: `http://127.0.0.1:${port}/userscts/${product1.id}`,
                id: 1,
              },
            },
            {
              id: item2.id,
              quantity: 3,
              product: {
                ref: `http://127.0.0.1:${port}/userscts/${product2.id}`,
                id: 2,
              },
            },
          ],
          products: [
            {
              _links: {
                self: {
                  href: `http://127.0.0.1:${port}/userscts/${product1.id}`
                },
                users: {
                  href: `http://127.0.0.1:${port}/userscts/${product1.id}/users`
                },
              },
              id: product1.id,
              name: 'Mediocre Iron Watch',
              priceInCents: 399,
            },
            {
              _links: {
                self: {
                  href: `http://127.0.0.1:${port}/userscts/${product2.id}`
                },
                users: {
                  href: `http://127.0.0.1:${port}/userscts/${product2.id}/users`
                },
              },
              id: product2.id,
              name: 'Heavy Duty Concrete Plate',
              priceInCents: 499,
            },
          ],
        }
      })
    })
  })

  describe("POST /userscts/:productId/users", () => {

    beforeEach(() => db.init())

    it("renders the newly created item", async () => {
      const product = db.products.insert({ name: 'Mediocre Iron Watch', priceInCents: 399 })

      db.products.insert({ name: 'Some other, non-included one', priceInCents: 4999 })

      const response = await chai.request(app).post(`/userscts/${product.id}/users`).send({ quantity: 4 })
      const port = url.parse(response.request.url).port

      expect(response).to.have.status(200)
      expect(response).to.be.json
      expect(response.body).to.deep.eq({
        id: 1,
        quantity: 4,
        product: {
          ref: `http://127.0.0.1:${port}/userscts/${product.id}`,
          id: product.id,
        },
      })
    })
  })

})