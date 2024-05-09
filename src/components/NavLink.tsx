"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface PaginationLinkProps {
  href: string;
  prefetch?: boolean;
  children: React.ReactNode;
}

function NavLink({ children, href, prefetch }: PaginationLinkProps) {
  const pathname = usePathname();

  if (href === pathname) {
    return <span className="text-orange-800">{children}</span>;
  }

  return (
    <Link
      href={href}
      prefetch={prefetch}
      className="text-orange-800 hover:underline"
    >
      {children}
    </Link>
  );
}

export default NavLink;
