"use server";

import { prisma } from "../../../lib/prisma";

/**
 * Fetches all folders belonging to a user by their auth userId.
 * 
 * Note: The Neon Auth user table uses a UUID `id`, but our Prisma User model
 * uses an autoincrement Int `id`. We look up the user by email since that's
 * the shared unique identifier between both systems.
 */
export async function getUserFolders(userEmail: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { email: userEmail },
      include: { folders: true },
    });

    if (!user) {
      return { folders: [], error: "User not found" };
    }

    // Return plain objects (not Prisma models) so they can be serialized across the server/client boundary
    const folders = user.folders.map((f) => ({
      id: f.id,
      folderName: f.folderName,
    }));

    return { folders, error: null };
  } catch (err) {
    console.error("Failed to fetch folders:", err);
    return { folders: [], error: "Failed to fetch folders" };
  }
}

/**
 * Creates a new folder for a user, looked up by email.
 */
export async function createFolder(userEmail: string, folderName: string) {
  try {
    const folder = await prisma.folder.create({
      data: {
        folderName,
        author: {
          connect: { email: userEmail },
        },
      },
    });

    return { folder: { id: folder.id, folderName: folder.folderName }, error: null };
  } catch (err) {
    console.error("Failed to create folder:", err);
    return { folder: null, error: "Failed to create folder" };
  }
}
