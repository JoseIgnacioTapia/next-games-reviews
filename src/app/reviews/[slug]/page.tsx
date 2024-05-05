import Image from "next/image";
import Heading from "@/components/Heading";
import ShareButtons from "@/components/ShareButtons";
import { getReview, getSlugs } from "@/lib/reviews";
import { notFound } from "next/navigation";

// export const dynamic = "force-dynamic";

interface ReviewPageProps {
  params: {
    slug: string; // El valor del slug, en este caso 'hollow-knight'
  };
  searchParams: Record<string, string>; // Un objeto vacío en este caso
}

export async function generateStaticParams() {
  const slugs = await getSlugs();
  // console.log("[ReviewPage] slugs:", slugs);

  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata(props: ReviewPageProps) {
  const { slug } = props.params;

  const review = await getReview(slug);
  if (!review) {
    notFound();
  }

  return {
    title: review.title,
  };
}

async function ReviewPage(props: ReviewPageProps) {
  const { slug } = props.params;

  const review = await getReview(slug);
  if (!review) {
    notFound();
  }
  // console.log("Review Page: ", slug);

  const body = typeof review.body === "string" ? review.body : "";

  return (
    <>
      <Heading>{review.title}</Heading>
      <p className="font-semibold pb-3">{review.subtitle}</p>
      <div className="flex gap-3 items-baseline">
        <p className="pb-2 italic">{review.date}</p>
        <ShareButtons />
      </div>
      <Image
        src={review.image}
        alt=""
        width="640"
        height="360"
        className="mb-2 rounded"
      />
      <article
        dangerouslySetInnerHTML={{ __html: body }}
        className="max-w-screen-sm prose prose-slate"
      />
    </>
  );
}

export default ReviewPage;
