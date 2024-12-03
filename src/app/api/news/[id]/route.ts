import { NextResponse } from "next/server";
import conn from "@/lib/db";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const formData = await request.formData();

    if (isNaN(id)) {
      return NextResponse.json(
        { error: "Неверный ID новости" },
        { status: 400 }
      );
    }

    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    let imageBytes = null;
    const image = formData.get("image");

    if (!title || !content) {
      return NextResponse.json(
        { error: "Заголовок и содержание обязательны" },
        { status: 400 }
      );
    }

    if (image instanceof File) {
      const bytes = await image.arrayBuffer();
      imageBytes = Buffer.from(bytes);
    }

    const result = await conn.query(
      `UPDATE news 
       SET title = $1,
           content = $2,
           image = COALESCE($3, image)
       WHERE id = $4 
       RETURNING *`,
      [title, content, imageBytes, id]
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
