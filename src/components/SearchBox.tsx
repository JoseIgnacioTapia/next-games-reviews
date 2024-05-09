"use client";

import { Input } from "@headlessui/react";
import { useIsClient } from "@/lib/hooks";

function SearchBox() {
  const isClient = useIsClient();
  if (!isClient) return null;

  return <Input placeholder="Search..." />;
}

export default SearchBox;
