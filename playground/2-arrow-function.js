// const square = function(x) {
//     return x * x;
// }

// const square = (x) => {
//     return x * x;
// }

// const square = (x) => x*x;

const myevent = {
    name: 'Birthday Party',
    guestList: ['Andrew', 'Jen', 'Mike'],
    printGuestList() {
        console.log('Guest list for ' + this.name)
        this.guestList.forEach((guest) => {
            console.log(guest + ' is attentend ' + this.name)
        })
    }
}

// console.log(square(3))
myevent.printGuestList()