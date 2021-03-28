const express = require('express')
const server = require('http').createServer
const expressConfig = require('./config/express.config')
const routes = require('./routes')

const app = express()

expressConfig(app)

// routes
routes(app)

const port = process.env.PORT || 3001
const http = server(app)

http.listen(port, () => console.log('Api connect in port ' + port))