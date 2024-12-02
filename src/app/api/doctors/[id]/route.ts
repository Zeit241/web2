import { NextResponse } from "next/server";
import conn from "@/lib/db";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const formData = await request.formData();
    const id = parseInt(params.id);

    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid doctor ID" }, { status: 400 });
    }

    const name = formData.get("name");
    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    let photoBytes = null;
    const photo = formData.get("photo");
    const specializations = formData.getAll("specializations[]");
    const experience = parseInt(formData.get("experience") as string) || 0;

    console.log(specializations);

    if (photo instanceof File) {
      const bytes = await photo.arrayBuffer();
      photoBytes = Buffer.from(bytes);
    }

    const result = await conn.query(
      `UPDATE doctors 
       SET name = $1, 
           experience = $2, 
           phone = $3, 
           email = $4, 
           photo = COALESCE($5, photo),
           description = $6
       WHERE id = $7 
       RETURNING *`,
      [
        name,
        experience,
        formData.get("phone") || null,
        formData.get("email") || null,
        photoBytes,
        formData.get("description") || null,
        id,
      ]
    );

    await conn.query(
      `DELETE FROM doctor_specializations WHERE doctor_id = $1`,
      [id]
    );

    if (specializations.length > 0) {
      const specializationValues = specializations
        .filter((e) => e !== "null")
        .map(
          (_, index) =>
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

    const doctor = updatedDoctor.rows[0];
    if (doctor.photo) {
      doctor.photo = `data:image/jpeg;base64,${doctor.photo.toString(
        "base64"
      )}`;
    }

    return NextResponse.json({ doctor });
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
