const fs = require('fs')
const chalk = require('chalk')

const addNodes = (title, body) => {
    const notes = loadNotes()
    const duplication = notes.find((note) => note.title === title)
    if (duplication) {
        console.log(chalk.red.inverse('Note title taken!'));
        return
    }
    notes.push({
        title: title,
        body: body
    })
    saveNotes(notes)
    console.log(chalk.green.inverse('Added a New note.'))
}

const saveNotes = (notes) => {
    fs.writeFileSync('notes.json', JSON.stringify(notes))
}

const loadNotes = () => {
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

const listNotes = () => {
    const notes = loadNotes();
    console.log(chalk.blue.inverse('Your notes'))
    notes.forEach(note => {
        console.log(note.title)
    });
}

const readNotes = (title) => {
    const notes = loadNotes();
    const note = notes.find((note) => note.title === title);
    if (!note) {
        console.log(chalk.red.inverse('Error. Not found note\'s title.'))
        return
    }
    console.log(chalk.green.inverse(title));
    console.log(chalk.yellow(note.body))
}

module.exports = {
    addNotes: addNodes,
    removeNotes: removeNotes,
    listNotes: listNotes,
    readNotes: readNotes
}