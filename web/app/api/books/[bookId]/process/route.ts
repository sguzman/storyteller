import { withHasPermission } from "@/auth"
import { getBookUuid } from "@/database/books"
import { cancelProcessing, startProcessing } from "@/work/distributor"

export const dynamic = "force-dynamic"

type Params = {
  bookId: string
}

export const POST = withHasPermission<Params>("book_process")((
  request,
  context,
) => {
  const bookUuid = getBookUuid(context.params.bookId)
  const url = request.nextUrl
  const restart = typeof url.searchParams.get("restart") === "string"

  void startProcessing(bookUuid, restart)

  return new Response(null, { status: 204 })
})

export const DELETE = withHasPermission<Params>("book_process")((
  _request,
  context,
) => {
  const bookUuid = getBookUuid(context.params.bookId)

  cancelProcessing(bookUuid)

  return new Response(null, { status: 204 })
})
