import { NextResponse } from "next/server";
import conn from "@/lib/db";
import mime from 'mime';
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const specializationId = searchParams.get("specialization");
  const position = searchParams.get("position");
  const doctorId = searchParams.get("id");
  const positions = position?.split(",");

  try {
    let query = `
      SELECT 
        d.id,
        d.name,
        d.experience,
        d.photo,
        d.phone,
        d.email,
        d.position,
        d.description,
        array_agg(s.name) as specializations
      FROM doctors d
      LEFT JOIN doctor_specializations ds ON d.id = ds.doctor_id
      LEFT JOIN specializations s ON ds.specialization_id = s.id
    `;

    let whereConditions = [];
    let values = [];
    let paramCounter = 1;

    if (positions && positions.length > 0) {
      whereConditions.push(`d.position = ANY($${paramCounter})`);
      values.push(`{${positions.join(",")}}`);
      paramCounter++;
    }

    if (specializationId) {
      whereConditions.push(`s.id = $${paramCounter}`);
      values.push(specializationId);
      paramCounter++;
    }

    if (doctorId) {
      whereConditions.push(`d.id = $${paramCounter}`);
      values.push(doctorId);
      paramCounter++;
    }

    if (whereConditions.length > 0) {
      query += ` WHERE ${whereConditions.join(" AND ")}`;
    }

    query += ` GROUP BY d.id, d.name, d.experience, d.photo, d.position, d.description`;

    const result = await conn.query(query, values);
    
    const x = result.rows.map(e=>{
      if(e.photo){
        const base64Data = Buffer.from(e.photo).toString('base64');
      const dataUri = `data:${"application/octet-stream"};base64,${base64Data.split("base64")[1]}`;
        e.photo = dataUri
        console.log(dataUri)
      }
      return e
    })
    
    return NextResponse.json({ doctors: x });
  } catch (error) {
    console.error("Error fetching doctors:", error);
    return NextResponse.json(
      { error: "Failed to fetch doctors" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const name = body.name as string;
    const experience = parseInt(body.experience as string);
    const phone = body.phone as string;
    const email = body.email as string;
    const description = body.description as string;
    const photo = body.photo;
    const specializations = body.specializations as string[];

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    await conn.query("BEGIN");

    try {
      const doctorResult = await conn.query(
        `INSERT INTO doctors (name, experience, phone, email, description, position) 
         VALUES ($1, $2, $3, $4, $5, $6) 
         RETURNING *`,
        [name, experience || 0, phone, email, description, "Доктор"]
      );

      const doctorId = doctorResult.rows[0].id;

      if (specializations.length > 0) {
        await conn.query(
          `INSERT INTO doctor_specializations (doctor_id, specialization_id)
           SELECT $1, id FROM specializations 
           WHERE name = ANY($2)`,
          [doctorId, specializations]
        );
      }

      if (photo) {
       
        const buffer = Buffer.from(photo, "base64");
        console.log("photo", buffer);
        await conn.query(`UPDATE doctors SET photo = $1 WHERE id = $2`, [
          buffer,
          doctorId,
        ]);
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
        [doctorId]
      );

      await conn.query("COMMIT");

      const doctor = updatedDoctor.rows[0];
      if (doctor.photo) {
        doctor.photo = `data:image/jpeg;base64,${doctor.photo.toString(
          "base64"
        )}`;
      }

      return NextResponse.json({ doctor });
    } catch (error) {
      await conn.query("ROLLBACK");
      throw error;
    }
  } catch (error) {
    console.error("Error creating doctor:", error);
    return NextResponse.json(
      { error: "Failed to create doctor" },
      { status: 500 }
    );
  }
}
