import Heading from "@/components/Heading";
import { getReview } from "@/lib/reviews";

async function StardeValleyPage() {
  const review = await getReview("stardew-valley");

  return (
    <>
      <Heading>{review.title}</Heading>
      <p className="pb-2 italic">{review.date}</p>
      <img
        src="/images/stardew-valley.jpg"
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

export default StardeValleyPage;
