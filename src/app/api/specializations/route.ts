import { NextResponse } from "next/server";
import conn from "@/lib/db";

// GET - получение всех специализаций
export async function GET() {
  try {
    const query = `
      SELECT id, name
      FROM specializations
      ORDER BY name ASC
    `;

    const result = await conn.query(query);

    return NextResponse.json({
      specializations: result.rows,
    });
  } catch (error) {
    console.error("Error fetching specializations:", error);
    return NextResponse.json(
      { error: "Failed to fetch specializations" },
      { status: 500 }
    );
  }
}

// POST - создание новой специализации
export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const name = formData.get("name") as string;

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const result = await conn.query(
      `INSERT INTO specializations (name)
       VALUES ($1)
       RETURNING *`,
      [name]
    );

    return NextResponse.json({ specialization: result.rows[0] });
  } catch (error) {
    console.error("Error creating specialization:", error);
    return NextResponse.json(
      { error: "Failed to create specialization" },
      { status: 500 }
    );
  }
}

