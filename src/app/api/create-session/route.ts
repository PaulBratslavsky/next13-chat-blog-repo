import { NextResponse } from "next/server";

export async function POST(request: Request) {

  const url = `${process.env.PRIVATE_API_URL}/api/open-agi/memory-chat`;
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
