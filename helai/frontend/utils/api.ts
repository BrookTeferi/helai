const BASE_URL = 'http://127.0.0.1:8000/'; // Adjust this to match your backend URL

/**
 * A reusable function to handle API requests.
 * 
 * @param endpoint - The API endpoint (relative to the BASE_URL).
 * @param method - The HTTP method (e.g., 'GET', 'POST', etc.).
 * @param body - The request body (optional).
 * @param headers - Additional headers (optional).
 * @returns A promise resolving to the parsed JSON response or throwing an error.
 */
export const apiRequest = async (
  endpoint: string,
  method: string,
  body?: Record<string, any> | null,
  headers: Record<string, string> = {}
): Promise<any> => {
  const url = `${BASE_URL}${endpoint}`;

  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, options);

    // Parse response
    const data = await response.json();

    // Handle HTTP errors
    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }

    return data;
  } catch (error: any) {
    console.error('API Request Error:', error.message);
    throw error;
  }
};
