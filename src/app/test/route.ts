// app/api/test/route.ts
import getDatabase from '@/lib/mongodb';

export async function GET() {
    const db = await getDatabase();
    const count = await db.collection('tasks').insertMany([{name:"name"}]);

    return Response.json({ taskCount: count });
}