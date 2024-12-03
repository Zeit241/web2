import { NextResponse } from "next/server";
import conn from "@/lib/db";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid doctor ID" }, { status: 400 });
    }

    const data = await request.json();
    const {
      name,
      experience,
      phone,
      email,
      photo,
      description,
      specializations,
    } = data;

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    console.log("data", data);

    const result = await conn.query(
      `UPDATE doctors 
       SET name = $1, 
           experience = $2, 
           phone = $3, 
           email = $4, 
           description = $5
       WHERE id = $6 
       RETURNING *`,
      [
        name,
        experience || 0,
        phone || null,
        email || null,
        description || null,
        id,
      ]
    );

    if (photo) {
      let buffer;

      buffer = Buffer.from(photo, "base64");

      await conn.query(`UPDATE doctors SET photo = $1 WHERE id = $2`, [
        buffer,
        id,
      ]);
    }

    await conn.query(
      `DELETE FROM doctor_specializations WHERE doctor_id = $1`,
      [id]
    );

    if (specializations.length > 0) {
      const specializationValues = specializations
        .filter((e: string) => e !== "null")
        .map(
          (_: any, index: number) =>
            `($1, (SELECT id FROM specializations WHERE name = $${index + 2}))`
        )
        .join(", ");

      await conn.query(
        `INSERT INTO doctor_specializations (doctor_id, specialization_id) 
         VALUES ${specializationValues}`,
        [id, ...specializations]
      );
    }

    const updatedDoctor = await conn.query(
      `SELECT 
         d.*,
         COALESCE(array_agg(s.name) FILTER (WHERE s.name IS NOT NULL), ARRAY[]::text[]) as specializations
       FROM doctors d
       LEFT JOIN doctor_specializations ds ON d.id = ds.doctor_id
       LEFT JOIN specializations s ON ds.specialization_id = s.id
       WHERE d.id = $1
       GROUP BY d.id`,
      [id]
    );

    return NextResponse.json({ doctor: updatedDoctor.rows[0] });
  } catch (error) {
    console.error("Error updating doctor:", error);
    return NextResponse.json(
      { error: "Failed to update doctor" },
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
      return NextResponse.json({ error: "Invalid doctor ID" }, { status: 400 });
    }

    // Сначала удаляем связи со специализациями
    await conn.query(
      "DELETE FROM doctor_specializations WHERE doctor_id = $1",
      [id]
    );

    // Затем удаляем самого доктора
    const result = await conn.query(
      "DELETE FROM doctors WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Doctor not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      deleted: result.rows[0],
    });
  } catch (error) {
    console.error("Error deleting doctor:", error);
    return NextResponse.json(
      { error: "Failed to delete doctor" },
      { status: 500 }
    );
  }
}
