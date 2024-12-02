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

// PUT - обновление специализации
export async function PUT(request: Request) {
  try {
    const { id, name } = await request.json();

    const result = await conn.query(
      "UPDATE specializations SET name = $1 WHERE id = $2 RETURNING *",
      [name, id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: "Specialization not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      specialization: result.rows[0],
    });
  } catch (error) {
    console.error("Error updating specialization:", error);
    return NextResponse.json(
      { error: "Failed to update specialization" },
      { status: 500 }
    );
  }
}

// DELETE - удаление специализации
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();

    const result = await conn.query(
      "DELETE FROM specializations WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: "Specialization not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      deleted: result.rows[0],
    });
  } catch (error) {
    console.error("Error deleting specialization:", error);
    return NextResponse.json(
      { error: "Failed to delete specialization" },
      { status: 500 }
    );
  }
}
