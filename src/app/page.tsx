import Link from "next/link";
import Heading from "@/components/Heading";

export default function HomePage() {
  console.log("[HomePage] rendering");

  return (
    <>
      <Heading>Indie Gamer</Heading>
      <p className="pb-3">Only the best indie games, reviewed for you.</p>
      <div className="bg-white w-80 border rounded shadow hover:shadow-xl sm:w-full">
        <Link
          href="/reviews/stardew-valley"
          className="flex flex-col sm:flex-row"
        >
          <img
            src="/images/stardew-valley.jpg"
            alt=""
            width="320"
            height="180"
            className="rounded-t sm:rounded-l sm:rounded-r"
          />
          <h2 className="font-semibold font-orbitron py-1 text-center sm:px-2">
            Stardew Valley
          </h2>
        </Link>
      </div>
      <div className="bg-white w-80 border rounded shadow hover:shadow-xl sm:w-full">
        <Link
          href="/reviews/hallow-knight"
          className="flex flex-col sm:flex-row"
        >
          <img
            src="/images/hallow-knight.jpg"
            alt=""
            width="320"
            height="180"
            className="rounded-t sm:rounded-l sm:rounded-r"
          />
          <h2 className="font-semibold font-orbitron py-1 text-center sm:px-2">
            Hallow Knight
          </h2>
        </Link>
      </div>
    </>
  );
}
