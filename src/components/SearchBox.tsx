"use client";

import { Combobox } from "@headlessui/react";

function SearchBox() {
  return (
    <Combobox>
      <Combobox.Input placeholder="Search..." />
    </Combobox>
  );
}

export default SearchBox;
