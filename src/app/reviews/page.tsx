import Link from "next/link";
import Image from "next/image";
import Heading from "@/components/Heading";
import { getReviews } from "@/lib/reviews";
import PaginationBar from "@/components/PaginationBar";

// export const dynamic = "force-dynamic";
// export const revalidate = 30; // seconds

export const metadata = {
  title: "Reviews",
};

interface ReviewsPageProps {
  params: {};
  searchParams: {
    page?: string;
  };
}

const PAGE_SIZE = 6;

async function ReviewsPage({ searchParams }: ReviewsPageProps) {
  const page = parsePageParams(searchParams.page);
  const { reviews, pageCount } = await getReviews(PAGE_SIZE, page);

  console.log("ReviewsPage rendering:", page);

  return (
    <>
      <Heading>Reviews</Heading>
      <PaginationBar href="/reviews" page={page} pageCount={pageCount} />
      <ul className="flex flex-row flex-wrap gap-3">
        {reviews.map((review, index) => (
          <li
            key={review.slug}
            className="bg-white border rounded shadow w-80 hover:shadow-xl"
          >
            <Link href={`/reviews/${review.slug}`}>
              <Image
                src={typeof review.image === "string" ? review.image : ""}
                alt=""
                priority={index === 0}
                width="320"
                height="180"
                className="rounded-t"
              />
              <h2 className="font-semibold font-orbitron py-1 text-center">
                {review.title}
              </h2>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default ReviewsPage;

function parsePageParams(paramsValue: string | undefined) {
  if (paramsValue) {
    const page = parseInt(paramsValue);
    if (isFinite(page) && page > 0) {
      return page;
    }
  }
  return 1;
}
