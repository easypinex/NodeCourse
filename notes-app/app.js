const validator = require('validator')
const chalk = require('chalk')
const yargs = require('yargs')

// Create Add Command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    handler: function() {
        console.log('Add a note.')
    }
});

// Create Remove Command
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    handler: function() {
        console.log('Remove a note.')
    }
});

// Create List Command
yargs.command({
    command: 'list',
    describe: 'List notes',
    handler: function() {
        console.log('List notes.')
    }
});

// Create Read Command
yargs.command({
    command: 'read',
    describe: 'Read a note',
    handler: function() {
        console.log('Read a note.')
    }
});
console.log(yargs.argv)