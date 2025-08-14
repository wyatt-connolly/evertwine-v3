"use server";

import { db } from "@/lib/firebase";
import {
  doc,
  collection,
  query,
  where,
  getDocs,
  writeBatch,
} from "firebase/firestore";

interface DeleteAccountResult {
  success: boolean;
  error?: string;
}

export async function deleteUserAccount(
  userId: string
): Promise<DeleteAccountResult> {
  try {
    const batch = writeBatch(db);

    // Collections to clean up
    const collectionsToClean = [
      { name: "messages", field: "creatorId" },
      { name: "message_room", field: "creatorId" },
      { name: "meetups", field: "creatorId" },
      { name: "blocked", field: "creatorId" },
      { name: "reports", field: "creatorId" },
      { name: "notifications", field: "creatorId" },
      { name: "unmatched", field: "creatorId" },
      { name: "verification_docs", field: "creatorId" },
      // Also check for documents where the user might be referenced differently
      { name: "messages", field: "senderId" },
      { name: "messages", field: "receiverId" },
      { name: "blocked", field: "blockedUserId" },
      { name: "reports", field: "reportedUserId" },
      { name: "notifications", field: "userId" },
      { name: "meetups", field: "participantIds", isArray: true },
    ];

    // Delete documents from each collection
    for (const collectionInfo of collectionsToClean) {
      let q;

      if (collectionInfo.isArray) {
        // For array fields, use array-contains
        q = query(
          collection(db, collectionInfo.name),
          where(collectionInfo.field, "array-contains", userId)
        );
      } else {
        // For regular fields
        q = query(
          collection(db, collectionInfo.name),
          where(collectionInfo.field, "==", userId)
        );
      }

      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((document) => {
        batch.delete(doc(db, collectionInfo.name, document.id));
      });
    }

    // Delete the main user document
    const userDocRef = doc(db, "users", userId);
    batch.delete(userDocRef);

    // Commit the batch delete
    await batch.commit();

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
