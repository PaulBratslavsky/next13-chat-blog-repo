import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get("sessionId");
  console.log(sessionId, "sessionId");

  const url = `${process.env.PRIVATE_API_URL}/api/open-agi/get-session-by-id/${sessionId}`;
  const token = process.env.PRIVATE_API_TOKEN;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
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
