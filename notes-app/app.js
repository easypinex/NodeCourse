const fs = require('fs');
const filePath = 'notes.txt'
fs.writeFileSync(filePath, 'some message');
fs.appendFileSync(filePath, '\nnew message');