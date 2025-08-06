import { NextRequest, NextResponse } from "next/server";

export default function POST(request: NextRequest) {
  const body = request.body;
  return NextResponse.json({ message: "world", status: 200 });
}
