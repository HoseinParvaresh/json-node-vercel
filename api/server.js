const fs = require("fs");
const os = require("os");
const path = require("path");

const tempDb = path.join(os.tmpdir(), "db.json");

if (!fs.existsSync(tempDb)) {
  fs.copyFileSync(path.join(process.cwd(), "db.json"), tempDb);
}

const router = jsonServer.router(tempDb);
