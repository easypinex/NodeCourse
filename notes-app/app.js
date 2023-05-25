const validator = require('validator')
const chalk = require('chalk')
const yargs = require('yargs')
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    handler: function() {
        console.log('Add a note.')
    }
});
console.log(yargs.argv)