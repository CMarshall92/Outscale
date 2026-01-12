const handler = async (
  requestType: "POST" | "GET", 
  url: string, 
  options?: Record<string, any>,
  body?: Record<string, any>, 
) => {
  try {
    const response = await fetch(url, {
      method: requestType || "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...options?.headers ? options.headers : {}
      },
      body: JSON.stringify(body || {}),
      ...options ? options : {}
    });

    if (!response.ok) {
      throw new Error(`Somethign went wrong witht the request: ${response.status}`);
    }

    const json = await response.json();

    if (!json.data) return null
    return json.data;
  } catch (error) {
    console.error("Network request failed:", error);
    return null;
  } 
}

export const GET = async <T>(url: string, options?: Record<string, any>) => {
  return handler("GET", url, options) as Promise<T | null>;
}

export const POST = async <T>(url: string, body?: Record<string, any>, options?: Record<string, any>) => {
  return handler("POST", url, options, body) as Promise<T | null>;
}