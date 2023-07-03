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
    const query = { name: 'Perry' };
    const result = await db.collection('users').find(query).toArray();
    const count = await db.collection('users').countDocuments(query);
    console.log(result)
    console.log(count)
    return 'done.';
}

main()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());