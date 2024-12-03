import { NextResponse } from "next/server";
import conn from "@/lib/db";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const service_name = formData.get("service_name") as string;
    const service_description = formData.get("service_description") as string;
    const price = parseInt(formData.get("price") as string);
    const category_name = formData.get("category_name") as string;

    if (!service_name || !category_name) {
      return NextResponse.json(
        { error: "Name and category are required" },
        { status: 400 }
      );
    }

    const result = await conn.query(
      `INSERT INTO services (service_name, service_description, price, category_name)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [service_name, service_description, price, category_name]
    );

    return NextResponse.json({ service: result.rows[0] });
  } catch (error) {
    console.error("Error creating service:", error);
    return NextResponse.json(
      { error: "Failed to create service" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const query = `
   SELECT 
    services.id,
    services.name AS service_name,
    services.price,
    services.description as service_description,
    service_categories.name AS category_name
FROM 
    services
JOIN 
    service_categories
ON 
    services.category_id = service_categories.id;

    `;

    const result = await conn.query(query);

    return NextResponse.json({
      services: result.rows,
    });
  } catch (error) {
    console.error("Ошибка при получении услуг:", error);
    return NextResponse.json(
      { error: "Не удалось получить список услуг" },
      { status: 500 }
    );
  }
}
