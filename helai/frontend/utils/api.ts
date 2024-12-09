const BASE_URL = 'http://127.0.0.1:8000/'; 
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

    // Check if response status is not okay (not 2xx)
    if (!response.ok) {
      let errorMessage = 'Something went wrong'; // Default error message

      // Attempt to extract and parse the error message from the response
      try {
        const errorData = await response.json();
        if (errorData.detail) {
          errorMessage = errorData.detail; // Common field for DRF error messages
        } else if (typeof errorData === 'object') {
          errorMessage = JSON.stringify(errorData); // Handle structured errors
        } else {
          errorMessage = String(errorData); // Handle unexpected error formats
        }
      } catch (parseError) {
        console.error('Error parsing response JSON:', parseError);
      }

      throw new Error(errorMessage); // Throw the extracted error message
    }

    // Parse the successful response
    try {
      return await response.json();
    } catch (jsonError) {
      return { message: await response.text() }; // Fallback to text response
    }
  } catch (error: any) {
    console.error('API Request Error:', error.message);
    throw error; // Rethrow the error to be handled by the caller
  }
};
