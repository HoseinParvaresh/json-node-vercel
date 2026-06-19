const jsonServer = require('json-server')
const fs = require('fs')
const path = require('path')
const os = require('os')

const server = jsonServer.create()
const middlewares = jsonServer.defaults()

// مسیر واقعی فایل در Vercel
const sourceDb = path.join(process.cwd(), 'db.json')
const tempDb = path.join(os.tmpdir(), 'db.json')

// کپی کردن فایل اگر وجود نداشت
try {
  if (!fs.existsSync(tempDb)) {
    fs.copyFileSync(sourceDb, tempDb)
  }
} catch (err) {
  console.error('DB copy error:', err)
}

const router = jsonServer.router(tempDb)

server.use(middlewares)

server.use(jsonServer.rewriter({
  '/api/*': '/$1',
}))

server.use(router)

module.exports = server
