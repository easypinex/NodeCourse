const { MongoClient } = require('mongodb');
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

    //   await db.collection('users').insertOne({
    //     name: 'Perry',
    //     age: 29
    //   });

    // const result = await db.collection('users').insertMany([
    //     {
    //         name: 'Jen',
    //         age: 23
    //     },
    //     {
    //         name: 'Gunter',
    //         age: 26
    //     },
    // ]);
    // if (!result.acknowledged) {
    //     console.error('insert error.')
    // }

    const result = await db.collection('tasks').insertMany([
        {
            description: 'Done of Section 10 course',
            completed: false
        },
        {
            description: '完成事中驗證',
            completed: false
        },
        {
            description: 'Jenkins 部署設置',
            completed: true
        },
    ]);
    if (!result.acknowledged) {
        return console.error('ops! insert error.')
    }
    
    return 'done.';
}

main()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());