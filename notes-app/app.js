const validator = require('validator')
const chalk = require('chalk')
const yargs = require('yargs')
const notes = require('./note')

// Custom my version
yargs.version('1.0.0')

// Create Add Command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function(argv) {
        notes.addNotes(argv.title, argv.body)
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
yargs.parse()