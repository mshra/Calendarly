import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { rows } = await sql`SELECT * FROM events`;
    return NextResponse.json({ events: rows });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const { title, date, time, description } = await request.json();
    const { rows } = await sql`
      INSERT INTO events (title, date, time, description)
      VALUES (${title}, ${date}, ${time}, ${description})
      RETURNING *
    `;
    return NextResponse.json({ event: rows[0] });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create event" },
      { status: 500 },
    );
  }
}
