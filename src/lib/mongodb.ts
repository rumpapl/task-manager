import { MongoClient,Db } from 'mongodb';

const uri = process.env.MONGO_DSN || 'mongodb://localhost:27017';
const options = {
    appName: 'task-manager',
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;


declare global {
    // eslint-disable-next-line no-var
    var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (!process.env.MONGO_DSN) {
    throw new Error("Add Mongo URI to .env.local");
}

if(process.env.NODE_ENV === 'development') {
    if(!global._mongoClientPromise) {
        client = new MongoClient(uri, options);
        global._mongoClientPromise = client.connect()
    }
    clientPromise = global._mongoClientPromise!;
}else {
    client = new MongoClient(uri, options);
    clientPromise = client.connect()
}

export  default async function getDatabase() : Promise<Db> {
    const mongoClient = await clientPromise;
    return mongoClient.db();
}
