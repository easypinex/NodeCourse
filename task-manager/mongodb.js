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
    const result = await db.collection('users').updateOne({ _id: new ObjectId('64a277ee1f034ffe05f822e9') },
        {
            // $set: {
            //     name: 'Mike'
            // },
            $inc: {
                age: 1
            }
        })
    if (!result.acknowledged || result.matchedCount == 0)
        console.log('ops! update error.')
    return 'done.';
}

main()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());