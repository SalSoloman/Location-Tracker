let map

document.addEventListener('DOMContentLoaded', () => {
  const socket = io('/')
})

function initMap() {
  navigator.geolocation.getCurrentPosition(pos => {
    const { latitude: lat, longitude: lng } = pos.coords
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat, lng},
      zoom: 12
    })
  }, err => {
    console.error(err)
  })
}
