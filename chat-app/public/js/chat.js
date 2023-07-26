const socket = io()
// socket.on('countUpdated', (count) => {
//     console.log('The count has been uplaoded!', count)
// })

// document.querySelector('#increment').addEventListener('click', () => {
//     socket.emit('increment')
// })

socket.on('message', (message) => {
    console.log(message)
})

document.querySelector('#message-form').addEventListener('submit', (e) => {
    e.preventDefault()
    const value = e.target.elements.message.value
    socket.emit('sendMessage', value, (message) => {
        console.log('The message was delivered', message)
    })
})

document.querySelector('#send_location').addEventListener('click', () => {
    if (!navigator.geolocation)
        return alert('Geolocation is not supported by your browser.')
    navigator.geolocation.getCurrentPosition((position) => {
        socket.emit('sendLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
    })
})