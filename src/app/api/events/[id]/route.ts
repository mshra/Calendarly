import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    await sql`DELETE FROM events WHERE id = ${params.id}`;
    return NextResponse.json({ message: "Event deleted" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete event" },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { title, date, time, description } = await request.json();
    const { rows } = await sql`
      UPDATE events
      SET title = ${title}, date = ${date}, time = ${time}, description = ${description}
      WHERE id = ${params.id}
      RETURNING *
    `;
    return NextResponse.json({ event: rows[0] });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update event" },
      { status: 500 },
    );
  }
}
