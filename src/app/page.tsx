import Heading from "@/components/Heading";
import type { ReactNode } from "react";

export default function HomePage() {
  console.log("[HomePage] rendering");

  return (
    <>
      <Heading>Indie Gamer</Heading>
      <p>Only the best indie games, reviewed for you.</p>
    </>
  );
}
