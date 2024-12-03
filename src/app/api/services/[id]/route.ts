import { NextResponse } from "next/server";
import conn from "@/lib/db";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json(
        { error: "Неверный ID услуги" },
        { status: 400 }
      );
    }

    const data = await request.json();
    const { service_name, service_description, price, category_name } = data;

    console.log("data", data);

    if (!service_name) {
      return NextResponse.json(
        { error: "Название и категория обязательны" },
        { status: 400 }
      );
    }

    const result = await conn.query(
      `UPDATE services 
       SET name = $1,
           description = $2,
           price = $3
       WHERE id = $4
       RETURNING id, 
                name as service_name, 
                description as service_description, 
                price,
                category_id`,
      [service_name, service_description, price, id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Услуга не найдена" }, { status: 404 });
    }

    return NextResponse.json({ service: result.rows[0] });
  } catch (error) {
    console.error("Ошибка при обновлении услуги:", error);
    return NextResponse.json(
      { error: "Не удалось обновить услугу" },
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
        { error: "Неверный ID услуги" },
        { status: 400 }
      );
    }

    const result = await conn.query(
      "DELETE FROM services WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Услуга не найдена" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      deleted: result.rows[0],
    });
  } catch (error) {
    console.error("Ошибка при удалении услуги:", error);
    return NextResponse.json(
      { error: "Не удалось удалить услугу" },
      { status: 500 }
    );
  }
}
