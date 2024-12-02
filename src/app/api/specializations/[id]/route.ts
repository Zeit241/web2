import { NextResponse } from "next/server";
import conn from "@/lib/db";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);

    if (isNaN(id)) {
      return NextResponse.json(
        { error: "Invalid specialization ID" },
        { status: 400 }
      );
    }

    const result = await conn.query(
      "DELETE FROM specializations WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: "Specialization not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      deleted: result.rows[0],
    });
  } catch (error) {
    console.error("Error deleting specialization:", error);
    return NextResponse.json(
      { error: "Failed to delete specialization" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const formData = await request.formData();
    const name = formData.get("name") as string;

    if (isNaN(id)) {
      return NextResponse.json(
        { error: "Invalid specialization ID" },
        { status: 400 }
      );
    }

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const result = await conn.query(
      "UPDATE specializations SET name = $1 WHERE id = $2 RETURNING *",
      [name, id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: "Specialization not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      specialization: result.rows[0],
    });
  } catch (error) {
    console.error("Error updating specialization:", error);
    return NextResponse.json(
      { error: "Failed to update specialization" },
      { status: 500 }
    );
  }
}
