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
        { error: "Неверный ID категории" },
        { status: 400 }
      );
    }

    const name = formData.get("name") as string;
    const description = formData.get("description") as string;

    if (!name) {
      return NextResponse.json(
        { error: "Название категории обязательно" },
        { status: 400 }
      );
    }

    const result = await conn.query(
      `UPDATE service_categories 
       SET name = $1,
           description = $2
       WHERE id = $3 
       RETURNING *`,
      [name, description, id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: "Категория не найдена" },
        { status: 404 }
      );
    }

    return NextResponse.json({ category: result.rows[0] });
  } catch (error) {
    console.error("Ошибка при обновлении категории:", error);
    return NextResponse.json(
      { error: "Не удалось обновить категорию" },
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
        { error: "Неверный ID категории" },
        { status: 400 }
      );
    }

    const result = await conn.query(
      "DELETE FROM service_categories WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: "Категория не найдена" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      deleted: result.rows[0],
    });
  } catch (error) {
    console.error("Ошибка при удалении категории:", error);
    return NextResponse.json(
      { error: "Не удалось удалить категорию" },
      { status: 500 }
    );
  }
}
