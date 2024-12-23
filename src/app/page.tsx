import Image from "next/image";
import { InfiniteScroll } from "./components/InfiniteScroll";
import { InputSearch } from "./components/InputSearch";
import { Button } from "./components/Button";

type SearchParams = {
  page?: string;
  search?: string;
};

export default async function Home({
  searchParams,
}: Readonly<{ searchParams: Promise<SearchParams> }>) {
  const parsedParams = await searchParams;

  return (
    <main className="flex-1 w-full flex flex-col pb-4">
      <div className="relative">
        <Image
          width={1440}
          height={261}
          src="/backgroundSearch.png"
          alt="Logo"
          className="h-[261px] w-full object-cover"
        />
        <InputSearch />
      </div>
      <div className="flex w-full flex-1 flex-col px-8 xl:px-44 pt-10">
        <div className="flex justify-between items-center">
          <h1 className="text-primary text-3xl">Resultado de busca</h1>
          <Button title="Novo Card " />
        </div>
        <InfiniteScroll parsedParams={parsedParams} />
      </div>
    </main>
  );
}
