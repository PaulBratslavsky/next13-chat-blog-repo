import { NextResponse } from "next/server";

export async function POST(request: Request) {

  const url = `${process.env.PRIVATE_API_URL}/api/open-agi/memory-chat`;
  const token = process.env.PRIVATE_API_TOKEN;
  const data = await request.json();

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
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
