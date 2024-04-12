import Heading from "@/components/Heading";
import ShareButtons from "@/components/ShareButtons";
import { getReview, getSlugs } from "@/lib/reviews";

interface ReviewPageProps {
  params: {
    slug: string; // El valor del slug, en este caso 'hollow-knight'
  };
  searchParams: Record<string, string>; // Un objeto vacío en este caso
}

export async function generateStaticParams() {
  const slugs = await getSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata(props: ReviewPageProps) {
  const { slug } = props.params;

  const review = await getReview(slug);

  return {
    title: review.title,
  };
}

async function ReviewPage(props: ReviewPageProps) {
  const { slug } = props.params;

  const review = await getReview(slug);
  console.log("Review Page: ", review);

  return (
    <>
      <Heading>{review.title}</Heading>
      <div className="flex gap-3 items-baseline">
        <p className="pb-2 italic">{review.date}</p>
        <ShareButtons />
      </div>
      <img
        src={review.image}
        alt=""
        width="640"
        height="360"
        className="mb-2 rounded"
      />
      <article
        dangerouslySetInnerHTML={{ __html: review.body }}
        className="max-w-screen-sm prose prose-slate"
      />
    </>
  );
}

export default ReviewPage;
