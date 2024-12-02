import { NextResponse } from "next/server";
import conn from "@/lib/db";

export async function GET() {
  try {
    const query = `
      SELECT id, name, description
      FROM service_categories
      ORDER BY name ASC
    `;

    const result = await conn.query(query);

    return NextResponse.json({
      categories: result.rows,
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const description = formData.get("description") as string;

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const result = await conn.query(
      `INSERT INTO categories (name, description)
       VALUES ($1, $2)
       RETURNING *`,
      [name, description]
    );

    return NextResponse.json({ category: result.rows[0] });
  } catch (error) {
    console.error("Error creating category:", error);
    return NextResponse.json(
      { error: "Failed to create category" },
      { status: 500 }
    );
  }
}
