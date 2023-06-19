import styles from "./page.module.css"
import { AddBookModal } from "./components/AddBookModal"
import { ApiClient } from "@/apiClient"

export const dynamic = "force-dynamic"

export default async function Home() {
  const apiHost = process.env["STORYTELLER_API_HOST"] ?? ""
  const client = new ApiClient({ BASE: apiHost })
  const books = await client.default.listBooksBooksGet()
  return (
    <main className={styles["main"]}>
      <h2>Your books</h2>
      <AddBookModal apiHost={apiHost} />
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <div>{book.title}</div>
            {book.authors[0] && <div>by {book.authors[0].name}</div>}
            {book.processing_status && (
              <div>
                Status: {book.processing_status.current_task} -{" "}
                {Math.floor(book.processing_status.progress * 100)}%{" "}
                {book.processing_status.in_error && "Failed"}
              </div>
            )}
            <div>
              <a download href={`${apiHost}/books/${book.id}/synced`}>
                Download
              </a>
            </div>
          </li>
        ))}
      </ul>
    </main>
  )
}
