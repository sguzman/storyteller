import { Head } from "$fresh/runtime.ts";
import BookUpload from "../islands/BookUpload.tsx";
import { Handlers, PageProps } from "$fresh/server.ts";

export const handler: Handlers = {
  async GET(_req, ctx) {
    return await ctx.render(Deno.env.get("STORYTELLER_API_HOST"));
  },
};

export default function Home({ data: apiHost }: PageProps<string>) {
  return (
    <>
      <Head>
        <title>Storyteller</title>
      </Head>
      <main>
        <BookUpload apiHost={apiHost} />
      </main>
    </>
  );
}
