import { readFile } from "node:fs/promises";
import { marked } from "marked";
import Heading from "@/components/Heading";

async function StardeValleyPage() {
  const text = await readFile(
    "./src/content/reviews/stardew-valley.md",
    "utf8"
  );
  const html = marked(text);

  return (
    <>
      <Heading>Stardew Valley</Heading>
      <img
        src="/images/stardew-valley.jpg"
        alt=""
        width="640"
        height="360"
        className="mb-2 rounded"
      />
      <article
        dangerouslySetInnerHTML={{ __html: html }}
        className="max-w-screen-sm prose prose-slate"
      />
    </>
  );
}

export default StardeValleyPage;
