'use strict'

const http = require('http')
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser');
const socketIo = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketIo(server)

const locationMap = new Map()
// map is a new JS object date type like a hashmap and it's an o1 look if somethinhg
// exist with no duplication

app.use(express.static(path.join(__dirname, 'public')))
// express.static may not work since it servers static files like images

app.get('/', (req, res) => {
  res.send('Hello')
})

io.on('connection', socket => {
  locationMap.set(socket.id, { lat: null, lng: null })

  socket.on('updateLocation', pos => {
    if(locationMap.has(socket.id)) {
      locationMap.set(socket.id, pos)
      console.log(socket.id, pos)
    }
  })
  socket.on('disconnect', () => {
    locationMap.delete(socket.id)
  })
})


server.listen(3000, err => {
  if (err) {
    throw err
  }
  console.log('app started on port 3000')
})
