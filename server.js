const http = require('http')

const app = require('./app')

app.set(process.env.port || 3000)
const server = http.createServer(app)

console.log('ici server de nouveau')
server.listen(process.env.port || 3000)