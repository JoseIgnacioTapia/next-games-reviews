import { NextResponse } from "next/server";
import { Request } from "node-fetch";

export async function POST(request: Request) {
  const payload = await request.json();
  console.log("payload", payload);
  return new Response(null, { status: 204 });
}
