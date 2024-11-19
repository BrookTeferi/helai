// utils/api.ts
const BASE_URL = 'http://127.0.0.1:8000/'; // Base URL for your backend API

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

  // Attach body if provided (for POST requests like registration and login)
  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, options);

    // Check if response status is not okay (not 2xx)
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Something went wrong');
    }

    // Try to parse JSON response, fallback to text if not JSON
    try {
      const data = await response.json();
      return data;
    } catch (error) {
      const text = await response.text();
      return { message: text };
    }
  } catch (error: any) {
    console.error('API Request Error:', error.message);
    throw error;
  }
};
