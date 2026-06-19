const jsonServer = require('json-server')
const fs = require('fs')
const path = require('path')
const os = require('os')

const server = jsonServer.create()

const tempDbPath = path.join(os.tmpdir(), 'db.json')

// فقط بار اول فایل را کپی کن
if (!fs.existsSync(tempDbPath)) {
  fs.copyFileSync(path.join(__dirname, 'db.json'), tempDbPath)
}

const router = jsonServer.router(tempDbPath)

const middlewares = jsonServer.defaults()

server.use(middlewares)

server.use(
  jsonServer.rewriter({
    '/api/*': '/$1',
    '/blog/:resource/:id/show': '/:resource/:id',
  })
)

server.use(router)

module.exports = server
