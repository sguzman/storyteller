import { withHasPermission } from "@/auth"
import { getBookUuid } from "@/database/books"
import { getAudioCoverFilepath } from "@/process/processAudio"
import { getEpubCoverFilepath, getEpubFilepath } from "@/process/processEpub"
import { UUID } from "@/uuid"
import { open } from "node:fs/promises"
import { NextResponse } from "next/server"
import { basename } from "node:path"
import { Epub } from "@/epub"

export const dynamic = "force-dynamic"

type Params = {
  bookId: UUID | string
}

export const GET = withHasPermission<Params>("book_read")(async (
  request,
  context,
) => {
  const bookUuid = await getBookUuid(context.params.bookId)
  const audio = typeof request.nextUrl.searchParams.get("audio") === "string"

  const coverFilepath = audio
    ? await getAudioCoverFilepath(bookUuid)
    : await getEpubCoverFilepath(bookUuid)

  try {
    // This actually might be undefined, but if it is, we want to
    // throw so that we end up in the catch block
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const file = await open(coverFilepath!)

    console.log("file exists")
    // @ts-expect-error NextResponse handles Node Streams just fine
    return new NextResponse(file.createReadStream(), {
      headers: {
        // If we got here, this is definitely defined
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        "Content-Disposition": `attachment; filename="${basename(coverFilepath!)}"`,
      },
    })
  } catch (_) {
    const epub = await Epub.from(getEpubFilepath(bookUuid))
    const coverImageItem = await epub.getCoverImage()
    if (!coverImageItem) return new NextResponse(null, { status: 404 })

    const coverImage = await epub.readItemContents(coverImageItem.id)

    return new NextResponse(coverImage)
  }
})
