import type { ReactNode } from "react";

interface HeadingProps {
  children: ReactNode;
}

function Heading({ children }: HeadingProps) {
  return <h1 className="font-bold font-orbitron pb-3 text-2xl">{children}</h1>;
}

export default Heading;
