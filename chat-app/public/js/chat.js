const socket = io()
// socket.on('countUpdated', (count) => {
//     console.log('The count has been uplaoded!', count)
// })

// document.querySelector('#increment').addEventListener('click', () => {
//     socket.emit('increment')
// })

const $messageForm = document.querySelector('#message-form')
const $messageFormInput = $messageForm.querySelector('input')
const $messageFormButton = $messageForm.querySelector('button')

socket.on('message', (message) => {
    console.log(message)
})

$messageForm.addEventListener('submit', (e) => {
    e.preventDefault()
    $messageFormButton.setAttribute('disabled', 'disabled')
    $messageFormInput.value = ''
    $messageFormInput.focus()
    const value = e.target.elements.message.value
    socket.emit('sendMessage', value, (error) => {
        $messageFormButton.removeAttribute('disabled')
        if (error) {
            return console.log(error)
        }
        console.log('Message delivered!')
    })
})

document.querySelector('#send_location').addEventListener('click', () => {
    if (!navigator.geolocation)
        return alert('Geolocation is not supported by your browser.')
    navigator.geolocation.getCurrentPosition((position) => {
        socket.emit('sendLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }, () => {
            console.log('Location Shared!')
        })
    })
})