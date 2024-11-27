
"use server"

import conn from "@/lib/db"

export async function hello() {
    try {
        const result = await conn.query('SELECT NOW() AS current_time;'); // Example query
        console.log('Current Time:', result.rows[0].current_time);
    } catch (err) {
        console.error('Error executing query', err.stack);
    } finally {
        await conn.end(); // Close the pool when done
    }
}