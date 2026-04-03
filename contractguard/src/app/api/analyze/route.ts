import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const apiKey = req.headers.get("x-api-key");

    if (!apiKey) {
      return NextResponse.json({ error: "API key missing" }, { status: 400 });
    }

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json(
      { error: { message: e instanceof Error ? e.message : "Unknown error" } },
      { status: 500 }
    );
  }
}
