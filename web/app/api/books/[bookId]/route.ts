import { deleteAssets } from "@/assets"
import { withHasPermission } from "@/auth"
import {
  AuthorInput,
  deleteBook,
  getBookUuid,
  getBooks,
  updateBook,
} from "@/database/books"
import { persistCustomCover as persistCustomAudioCover } from "@/process/processAudio"
import { persistCustomCover as persistCustomTextCover } from "@/process/processEpub"
import { isProcessing } from "@/work/distributor"
import { extension } from "mime-types"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

type Params = {
  bookId: string
}

export const PUT = withHasPermission<Params>("book_update")(async (
  request,
  context,
) => {
  const bookUuid = getBookUuid(context.params.bookId)
  const formData = await request.formData()
  const title = formData.get("title")?.valueOf()
  if (typeof title !== "string") {
    return NextResponse.json(
      { message: "Book must have a title" },
      { status: 405 },
    )
  }
  const authorStrings = formData.getAll("authors")
  const authors = authorStrings.map(
    (authorString) =>
      JSON.parse(authorString.valueOf() as string) as AuthorInput,
  )
  const updated = updateBook(bookUuid, title, authors)

  const textCover = formData.get("text_cover")?.valueOf()
  if (typeof textCover === "object") {
    const textCoverFile = textCover as File
    const ext = extension(textCoverFile.type)
    const arrayBuffer = await textCoverFile.arrayBuffer()
    const data = new Uint8Array(arrayBuffer)
    await persistCustomTextCover(bookUuid, `Cover.${ext}`, data)
  }

  const audioCover = formData.get("audio_cover")?.valueOf()
  if (typeof audioCover === "object") {
    const audioCoverFile = audioCover as File
    const ext = extension(audioCoverFile.type)
    const arrayBuffer = await audioCoverFile.arrayBuffer()
    const data = new Uint8Array(arrayBuffer)
    await persistCustomAudioCover(bookUuid, `Audio Cover.${ext}`, data)
  }

  return NextResponse.json({
    ...updated,
    ...(updated.processingStatus && {
      processing_status: {
        ...updated.processingStatus,
        current_task: updated.processingStatus.currentTask,
      },
    }),
  })
})

export const GET = withHasPermission<Params>("book_read")((
  _request,
  context,
) => {
  const bookUuid = getBookUuid(context.params.bookId)
  const [book] = getBooks([bookUuid])
  if (!book) {
    return NextResponse.json(
      { message: `Could not find book with id ${context.params.bookId}` },
      { status: 404 },
    )
  }

  return NextResponse.json({
    ...book,
    ...(book.processingStatus && {
      processing_status: {
        ...book.processingStatus,
        current_task: book.processingStatus.currentTask,
        is_processing: isProcessing(book.uuid),
      },
    }),
  })
})

export const DELETE = withHasPermission<Params>("book_delete")(async (
  _request,
  context,
) => {
  const bookUuid = getBookUuid(context.params.bookId)
  const [book] = getBooks([bookUuid])
  if (!book) {
    return NextResponse.json(
      { message: `Could not find book with id ${context.params.bookId}` },
      { status: 404 },
    )
  }

  deleteBook(book.uuid)
  await deleteAssets(book.uuid)

  return new Response(null, { status: 204 })
})
