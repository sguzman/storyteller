import { withHasPermission } from "@/auth"
import { deleteUser } from "@/database/users"
import { UUID } from "@/uuid"

export const dynamic = "force-dynamic"

type Params = {
  userUuid: UUID
}

export const DELETE = withHasPermission<Params>("user_delete")((
  _request,
  context,
) => {
  deleteUser(context.params.userUuid)

  return new Response(null, { status: 204 })
})
