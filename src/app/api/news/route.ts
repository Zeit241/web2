import conn from "@/lib/db";

async function handler(req, res) {
    try {
        const result = await conn.query('SELECT * FROM news;');
        return Response.json({ services: result.rows })
       
    } catch (error) {
        return Response.json({ error: true })
        console.error('Error executing query', error.stack);
    }
}

export { handler as GET };
