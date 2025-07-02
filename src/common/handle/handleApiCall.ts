export async function handleApiCall<T>(
  apiCall: () => Promise<{ status: number; data: T }>,
  operation: string
): Promise<T> {
  try {
    const response = await apiCall();

    if (response.status < 200 || response.status >= 300) {
      throw new Error(`Failed to ${operation}: HttpStatus: ${response.status}`);
    }

    return response.data;
  } catch (error) {
    console.error(`Error ${operation}:`, error);
    throw new Error(
      `Failed to ${operation}: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}
