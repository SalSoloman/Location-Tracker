'use strict'

const http = require('http')
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser');
const socketIo = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketIo(server)

app.use(express.static(path.join(__dirname, 'public')))
// express.static may not work since it servers static files like images

app.get('/', (req, res) => {
  res.send('Hello')
})

io.on('connection', socket => {
  socket.on('_ping', () => {
    console.log('got ping')
    socket.emit('_pong')
  })
})

server.listen(3000, err => {
  if (err) {
    throw err
  }
  console.log('app started on port 3000')
})
