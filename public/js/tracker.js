document.addEventListener('DOMContentLoaded', () => {
  const socket = io('/')

  socket.emit('_ping')

  socket.on('_pong', () => {
    console.log('got pong')
  })

  const positionOptions = {
    enableHighAccuracy: true,
    maximumAge: 0
  }

  navigator.geolocation.getCurrentPosition(pos => {
    console.log(pos.coords)
  }, err => {
    console.error(err )
  }, positionOptions)
})
