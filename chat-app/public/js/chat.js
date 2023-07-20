const socket = io()
socket.on('countUpdated', (count) => {
    console.log('The count has been uplaoded!', count)
})

document.querySelector('#increment').addEventListener('click', () => {
    socket.emit('increment')
})