const fs = require('fs')
const chalk = require('chalk')

const getNotes = function () {
    return 'Your notes...';
}

const addNodes = function(title, body) {
    const notes = loadNotes()
    const duplication = notes.filter((note) => {
        return note.title === title;
    })
    if (duplication.length != 0) {
        // duplication
        console.warn('Error. duplication note!');
        return
    }
    notes.push({
        title: title,
        body: body
    })
    saveNotes(notes)
    console.log('Added a New note.')
}

const saveNotes = function(notes) {
    fs.writeFileSync('notes.json', JSON.stringify(notes))
}

const loadNotes = function() {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJson = dataBuffer.toString()
        return JSON.parse(dataJson);
    } catch(e) {
        return []
    }
}

const removeNotes = (title) => {
    const notes = loadNotes();
    let found = false;
    for (let index = notes.length-1; index >=0 ; index--) {
        const note = notes[index];
        if (note.title === title) {
            notes.splice(index, 1)
            found = true
            break
        }
    }
    if (!found) {
        console.log(chalk.red.inverse('Note not found!'))
        return
    }
    saveNotes(notes)
    console.log(chalk.green.inverse('Note removed!'))
}
module.exports = {
    getNotes: getNotes,
    addNotes: addNodes,
    removeNotes: removeNotes
}