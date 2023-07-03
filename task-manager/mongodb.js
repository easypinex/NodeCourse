const { MongoClient, ObjectId } = require('mongodb');
// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'task-masger';

async function main() {
    // Use connect method to connect to the server
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const last_task = await db.collection('tasks').findOne(new ObjectId("64a28097d4f11f81909a0a52"));
    console.log('last_task', last_task)
    const not_complete = await db.collection('tasks').find({ completed: false }).toArray();
    console.log('not_complete', not_complete)
    return 'done.';
}

main()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());