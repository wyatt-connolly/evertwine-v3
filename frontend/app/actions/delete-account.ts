"use server";

import { API_ENDPOINTS, getAuthHeaders } from "@/lib/firebase";

interface DeleteAccountResult {
  success: boolean;
  error?: string;
}

export async function deleteUserAccount(
  userId: string
): Promise<DeleteAccountResult> {
  try {
    const response = await fetch(`${API_ENDPOINTS.users.deleteAccount}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        error: errorData.message || "Failed to delete account",
      };
    }

    return {
      success: true,
    };
  } catch (error) {
    console.error("Error deleting user account:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to delete account",
    };
  }
}
