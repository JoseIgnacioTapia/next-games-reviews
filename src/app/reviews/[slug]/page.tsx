import Heading from "@/components/Heading";
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

async function ReviewPage(props: ReviewPageProps) {
  const { slug } = props.params;

  const review = await getReview(slug);

  return (
    <>
      <Heading>{review.title}</Heading>
      <p className="pb-2 italic">{review.date}</p>
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
