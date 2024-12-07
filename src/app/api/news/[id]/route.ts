import { NextResponse } from "next/server";
import conn from "@/lib/db";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const body = await request.json();
    const { title, content, image } = body;

    if (isNaN(id)) {
      return NextResponse.json(
        { error: "Неверный ID новости" },
        { status: 400 }
      );
    }

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
      `UPDATE news 
       SET title = $1,
           content = $2,
           image = COALESCE($3, image)
       WHERE id = $4 
       RETURNING *`,
      [title, content, imageBuffer, id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: "Новость не найдена" },
        { status: 404 }
      );
    }

    const news = result.rows[0];
    if (news.image) {
      news.image = `data:image/jpeg;base64,${news.image.toString("base64")}`;
    }

    return NextResponse.json({ news });
  } catch (error) {
    console.error("Ошибка при обновлении новости:", error);
    return NextResponse.json(
      { error: "Не удалось обновить новость" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);

    if (isNaN(id)) {
      return NextResponse.json(
        { error: "Неверный ID новости" },
        { status: 400 }
      );
    }

    const result = await conn.query(
      "DELETE FROM news WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: "Новость не найдена" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      deleted: result.rows[0],
    });
  } catch (error) {
    console.error("Ошибка при удалении новости:", error);
    return NextResponse.json(
      { error: "Не удалось удалить новость" },
      { status: 500 }
    );
  }
}
