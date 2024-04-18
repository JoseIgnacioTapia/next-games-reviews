import { readFile, readdir } from "node:fs/promises";
import { marked } from "marked";
import matter from "gray-matter";
import qs from "qs";
import { Game, GameAttributes, ImageData, ReviewData } from "../types/index";

const CMS_URL = "http://localhost:1337";

// export async function getFeaturedReview(): Promise<GameAttributes> {
//   const reviews = await getReviews();
//   return reviews[0];
// }

export async function getReview(slug: string): Promise<ReviewData> {
  const { data } = await fetchReviews({
    filters: { slug: { $eq: slug } },
    fields: ["slug", "title", "subtitle", "publishedAt", "body"],
    populate: { image: { fields: ["url"] } },
    pagination: { pageSize: 1, withCount: false },
  });
  const item = data[0];
  // console.log(item);

  return {
    ...toReview(item),
    body: marked(item.attributes.body, {
      // headerIds: false,
      // mangle: false,
    }),
  };
}

export async function getReviews(pageSize: number): Promise<GameAttributes[]> {
  const { data } = await fetchReviews({
    fields: ["slug", "title", "subtitle", "publishedAt"],
    populate: { image: { fields: ["url"] } },
    sort: ["publishedAt:desc"],
    pagination: { pageSize },
  });

  return data.map(toReview);
}

export async function getSlugs(): Promise<string[]> {
  const { data } = await fetchReviews({
    fields: ["slug"],
    sort: ["publishedAt:desc"],
    pagination: { pageSize: 100 },
  });

  return data.map((item: any) => item.attributes.slug);
}

async function fetchReviews(parameters: any): Promise<any> {
  const url =
    `${CMS_URL}/api/reviews?` +
    qs.stringify(parameters, { encodeValuesOnly: true });
  // console.log("fetchReviews:", url);

  const response = await fetch(url);
  // console.log(response);

  if (!response.ok) {
    throw new Error(`CMS returned error: ${response.status} for ${url}`);
  }

  return await response.json();
}

function toReview(item: any): ReviewData {
  const { attributes } = item;
  const image: ImageData = attributes.image.data;

  return {
    slug: attributes.slug,
    title: attributes.title,
    subtitle: attributes.subtitle,
    date: attributes.publishedAt.slice(0, "yyyy-mm-dd".length),
    image: CMS_URL + image.attributes.url,
  };
}
