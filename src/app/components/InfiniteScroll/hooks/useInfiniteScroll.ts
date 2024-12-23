import { IPokemonItens } from "@/app/interfaces/pokemonItens";
import { useState, useEffect, useCallback, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { fetchListAction } from "@/app/actions/fetchListAction";
import { useQueryParams } from "@/app/utils/searchParams";

const ITEMS_PER_PAGE = 30;
type PokemonList = IPokemonItens[];

export const useInfiniteScroll = () => {
  const { pageSize, updateParams, searchTerm } = useQueryParams();
  const [items, setItems] = useState<PokemonList>([]);
  const [filteredItems, setFilteredItems] = useState<PokemonList>([]);
  const [visibleItems, setVisibleItems] = useState<PokemonList>([]);
  const [page, setPage] = useState(pageSize);
  const loadingRef = useRef(false);

  const { ref, inView } = useInView();

  const filterItems = useCallback((data: PokemonList, term: string) => {
    if (!term) return data;
    return data.filter((item) =>
      item.name.toLowerCase().includes(term.toLowerCase())
    );
  }, []);

  const getInitialItems = (
    data: PokemonList,
    currentPage: number
  ): PokemonList => {
    const itemsToShow = currentPage * ITEMS_PER_PAGE;
    return data.slice(0, itemsToShow);
  };

  const getNextPage = (currentPage: number): PokemonList => {
    const fromIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const toIndex = fromIndex + ITEMS_PER_PAGE;
    return filteredItems.slice(fromIndex, toIndex);
  };

  const initialLoad = async () => {
    loadingRef.current = true;
    const data = await fetchListAction();
    setItems(data);
    const filtered = filterItems(data, searchTerm);
    setFilteredItems(filtered);
    const initialItems = getInitialItems(filtered, pageSize || 1);
    setVisibleItems(initialItems);
    loadingRef.current = false;
  };

  const handleSearch = (term: string) => {
    const filtered = filterItems(items, term);
    setFilteredItems(filtered);
    const initialVisible = getInitialItems(filtered, 1);
    setVisibleItems(initialVisible);
    setPage(1);

    updateParams({ page: 1, search: term });
  };

  const loadMore = async () => {
    if (loadingRef.current) return;
    loadingRef.current = true;
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const nextItems = getNextPage(page + 1);

    if (nextItems.length > 0) {
      setVisibleItems((prev) => [...prev, ...nextItems]);
      setPage((prev) => prev + 1);
      updateParams({ page: page + 1 });
    }
    loadingRef.current = false;
  };

  useEffect(() => {
    initialLoad();
  }, []);

  useEffect(() => {
    if (inView && !loadingRef.current) {
      loadMore();
    }
  }, [inView]);

  useEffect(() => {
    if (items.length > 0) {
      const filtered = filterItems(items, searchTerm);
      setFilteredItems(filtered);
      const initialVisible = getInitialItems(filtered, pageSize || 1);
      setVisibleItems(initialVisible);
      setPage(1);
    }
  }, [searchTerm, items]);

  return {
    pokemonList: visibleItems,
    ref,
    handleSearch,
    searchTerm,
  };
};
