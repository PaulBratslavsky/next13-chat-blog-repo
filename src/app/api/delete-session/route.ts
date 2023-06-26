import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get("sessionId");

  const url = `${process.env.PRIVATE_API_URL}/api/open-agi/delete-session-by-id/${sessionId}`;
  const token = process.env.PRIVATE_API_TOKEN;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-cache",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data from API");
    }

    const json = await response.json();
    console.log(json);
    return NextResponse.json(json);
  } catch (error) {
    console.error(error);
  }
}
