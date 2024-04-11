import { readFile, readdir } from "node:fs/promises";
import { marked } from "marked";
import matter from "gray-matter";
import qs from "qs";

const CMS_URL = "http://localhost:1337";

export async function getFeaturedReview() {
  const reviews = await getReviews();
  return reviews[0];
}

export async function getReview(slug: string) {
  const text = await readFile(`./src/content/reviews/${slug}.md`, "utf8");
  const {
    content,
    data: { title, date, image },
  } = matter(text);
  const body = marked(content);

  return { slug, title, date, image, body };
}

export async function getReviews() {
  const url =
    `${CMS_URL}/api/reviews?` +
    qs.stringify(
      {
        fields: ["slug", "title", "subtitle", "publishedAt"],
        populate: { image: { fields: ["url"] } },
        sort: ["publishedAt:desc"],
        pagination: { pageSize: 6 },
      },
      { encodeValuesOnly: true }
    );
  console.log("getReviews:", url);

  const response = await fetch(url);
  const { data } = await response.json();

  return data.map(({ attributes }) => ({
    slug: attributes.slug,
    title: attributes.title,
    date: attributes.publishedAt.slice(0, "yyyy-mm-dd".length),
    image: CMS_URL + attributes.image.data.attributes.url,
  }));
}

export async function getSlugs() {
  const files = await readdir("./src/content/reviews");

  return files
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(".md", ""));
}
