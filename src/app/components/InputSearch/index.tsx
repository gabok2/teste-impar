"use client";

import { useState } from "react";
import Image from "next/image";
import { useInfiniteScroll } from "../InfiniteScroll/hooks/useInfiniteScroll";

export function InputSearch() {
  const { handleSearch, searchTerm } = useInfiniteScroll();
  const [searchValue, setSearchValue] = useState(searchTerm);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setSearchValue(value);
    handleSearch(value);
  };

  return (
    <div className="absolute top-3/4 left-0 -translate-y-3/4 w-full px-8 xl:px-44">
      <div className="relative w-full py-6 px-7 bg-white rounded-lg flex items-center">
        <input
          value={searchValue}
          onChange={handleInputChange}
          type="text"
          placeholder="Digite aqui sua busca..."
          className="w-full ml-3 text-2xl text-neutral-500 font-normal focus:outline-none bg-transparent"
        />
        <Image
          width={24}
          height={24}
          src="/search.svg"
          alt="Logo"
          className="h-auto w-auto absolute right-7 hidden md:block"
        />
      </div>
    </div>
  );
}
