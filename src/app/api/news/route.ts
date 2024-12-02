import { NextResponse } from "next/server";
import conn from "@/lib/db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const limit = searchParams.get("limit");

    let query = "SELECT * FROM news";
    let values: any[] = [];

    if (id) {
      query += " WHERE id = $1";
      values.push(Number(id));
    }

    query += " ORDER BY published_at DESC";

    if (limit) {
      query += " LIMIT $" + (values.length + 1);
      values.push(Number(limit));
    }

    const result = await conn.query(query, values);

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "News not found" }, { status: 404 });
    }

    return NextResponse.json({ news: result.rows });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
