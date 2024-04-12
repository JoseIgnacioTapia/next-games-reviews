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
  const { data } = await fetchReviews({
    filters: { slug: { $eq: slug } },
    fields: ["slug", "title", "subtitle", "publishedAt", "body"],
    populate: { image: { fields: ["url"] } },
    pagination: { pageSize: 1, withCount: false },
  });
  const item = data[0];
  console.log(item);

  return {
    ...toReview(item),
    body: marked(item.attributes.body, {
      // headerIds: false,
      // mangle: false,
    }),
  };
}

export async function getReviews() {
  const { data } = await fetchReviews({
    fields: ["slug", "title", "subtitle", "publishedAt"],
    populate: { image: { fields: ["url"] } },
    sort: ["publishedAt:desc"],
    pagination: { pageSize: 6 },
  });

  return data.map(toReview);
}

export async function getSlugs() {
  const files = await readdir("./src/content/reviews");

  return files
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(".md", ""));
}

async function fetchReviews(parameters) {
  const url =
    `${CMS_URL}/api/reviews?` +
    qs.stringify(parameters, { encodeValuesOnly: true });
  console.log("fetchReviews:", url);

  const response = await fetch(url);
  console.log(response);

  if (!response.ok) {
    throw new Error(`CMS returned error: ${response.status} for ${url}`);
  }

  return await response.json();
}

function toReview(item) {
  const { attributes } = item;

  return {
    slug: attributes.slug,
    title: attributes.title,
    date: attributes.publishedAt.slice(0, "yyyy-mm-dd".length),
    image: CMS_URL + attributes.image.data.attributes.url,
  };
}
