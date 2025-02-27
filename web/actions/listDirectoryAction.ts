"use server"

import { hasPermission } from "@/auth"
import { readdir, stat } from "fs/promises"
import { cookies } from "next/headers"
import { join, dirname } from "node:path"

export type DirectoryEntry = { name: string; type: "file" | "directory" }

export async function listDirectoryAction(
  directory: string,
): Promise<DirectoryEntry[]> {
  if (!hasPermission("book_create", cookies().get("st_token"))) {
    throw new Error("Forbidden")
  }

  if (!directory.endsWith("/")) {
    const parent = dirname(directory)
    return listDirectoryAction(parent + "/")
  }

  let entries: string[]
  try {
    entries = await readdir(directory)
  } catch {
    return []
  }

  const entryStats = (
    await Promise.all(
      entries.map(async (entry) => {
        try {
          const stats = await stat(join(directory, entry))
          return [entry, stats] as const
        } catch {
          return null
        }
      }),
    )
  ).filter((entry) => !!entry)

  return entryStats.map(([filename, stats]) => ({
    name: filename,
    type: stats.isDirectory() ? "directory" : "file",
  }))
}
