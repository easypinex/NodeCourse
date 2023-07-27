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
const $messages = document.querySelector('#messages')
const messageTemplate = document.querySelector('#message-template').innerHTML

socket.on('message', (message) => {
    console.log(message)
    const html = Mustache.render(messageTemplate, {
        message
    })
    $messages.insertAdjacentHTML('beforeend', html)
})

$messageForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const value = e.target.elements.message.value
    $messageFormButton.setAttribute('disabled', 'disabled')
    $messageFormInput.value = ''
    $messageFormInput.focus()
    socket.emit('sendMessage', value, (error) => {
        $messageFormButton.removeAttribute('disabled')
        if (error) {
            return console.log(error)
        }
        console.log('Message delivered!')
    })
})

const $locationButton = document.querySelector('#send_location')
$locationButton.addEventListener('click', () => {
    if (!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser.')
    }
    $locationButton.setAttribute('disabled', 'disabled')
    navigator.geolocation.getCurrentPosition((position) => {
        socket.emit('sendLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }, () => {
            $locationButton.removeAttribute('disabled')
            console.log('Location Shared!')
        })
    })
})