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

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, content, image } = body;

    if (!title || !content) {
      return NextResponse.json(
        { error: "Заголовок и содержание обязательны" },
        { status: 400 }
      );
    }

    let imageBuffer = null;
    if (image) {
      const base64Data = image.split(",")[1];
      imageBuffer = Buffer.from(base64Data, "base64");
    }

    const result = await conn.query(
      `INSERT INTO news (title, content, image, published_at)
       VALUES ($1, $2, $3, CURRENT_TIMESTAMP)
       RETURNING *`,
      [title, content, imageBuffer]
    );

    const news = result.rows[0];
    if (news.image) {
      news.image = `data:image/jpeg;base64,${news.image.toString("base64")}`;
    }

    return NextResponse.json({ news });
  } catch (error) {
    console.error("Ошибка при создании новости:", error);
    return NextResponse.json(
      { error: "Не удалось создать новость" },
      { status: 500 }
    );
  }
}


