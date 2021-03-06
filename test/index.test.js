const chai = require('chai')
chai.use(require('chai-http'))
const expect = chai.expect
const app = require('../app')
const url = require('url')

describe("GET /", () => {

  it("renders a list of available endpoints", async function () {
    const response = await chai.request(app).get('/')
    const port = url.parse(response.request.url).port

    expect(response).to.have.status(200)
    expect(response).to.be.json
    expect(response.body).to.deep.eq({
      _links: {
        self: {
          href: `http://127.0.0.1:${port}/`
        },
        data: {
          href: `http://127.0.0.1:${port}/data`
        },
        users: {
          href: `http://127.0.0.1:${port}/users`
        },
        admin: {
          href: `http://127.0.0.1:${port}/admin`
        },
      }
    })
  })

})