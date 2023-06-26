export async function apiRequest(url: string, options: any) {
  if (!url) throw new Error("Request URL is required");

  const mergeOptions = { 
    headers: {
      "Content-Type": "application/json",
    },
    ...options 
  };

  try {
    const response = await fetch(url, { ...mergeOptions });

    if (!response.ok) {
      throw new Error("Failed to fetch data from API");
    }

    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
}
