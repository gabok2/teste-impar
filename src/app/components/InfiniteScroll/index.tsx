"use client";

import { IPokemonItens } from "@/app/interfaces/pokemonItens";
import { ListPokemon } from "../ListPokemon";
import { Spinner } from "../Spinner";
import { useInfiniteScroll } from "./hooks/useInfiniteScroll";
import { useParamsStore } from "@/app/store/queryParams";
import { useEffect } from "react";

type InfiniteScrollProps = Readonly<{
  parsedParams: {
    page?: string;
    search?: string;
  };
}>;

export function InfiniteScroll({ parsedParams }: InfiniteScrollProps) {
  const setParams = useParamsStore((state) => state.setParams);

  const { pokemonList, ref } = useInfiniteScroll();

  useEffect(() => {
    setParams(parsedParams);
  }, [parsedParams, setParams]);

  return (
    <div className="flex flex-col h-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-5 gap-4 pt-9">
        {pokemonList.map((item: IPokemonItens) => (
          <ListPokemon key={item.name} item={item} />
        ))}
      </div>

      <div className="h-full flex justify-center">
        <div
          className="flex justify-center items-center p-4 col-span-1 sm:col-span-2 md:col-span-3"
          ref={ref}
        >
          <Spinner />
        </div>
      </div>
    </div>
  );
}
