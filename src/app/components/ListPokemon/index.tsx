import Image from "next/image";
import { toast } from "react-toastify";

interface ListPokemonProps {
  readonly item: {
    readonly name: string;
    readonly image: string;
  };
}

export function ListPokemon({ item }: ListPokemonProps) {
  return (
    <div key={item.name} className="card">
      <div className="rounded-lg bg-white grid place-items-center text-center shadow-sm border border-gray-300">
        <div className="w-full px-8 flex flex-col items-center justify-center">
          <div className="pt-7 pb-6">
            <div className="bg-neutral-100 h-24 w-24 rounded-full flex items-center justify-center border border-gray-300">
              <Image
                width={96}
                height={96}
                src={item.image}
                className="w-16 h-16 rounded-full"
                alt={""}
              />
            </div>
          </div>
          <div className="w-full border border-gray-300 opacity-30" />
        </div>
        <p className="pt-3 pb-7">{item.name}</p>
        <div className="px-8 flex justify-between items-center w-full py-4 bg-white bg-no-repeat shadow-[inset_0px_3px_6px_rgba(0,0,0,0.06)] rounded-b-lg opacity-100">
          <button
            onClick={() => {
              toast.error("funcionalidade não foi implementada");
            }}
            className="flex items-center gap-3 cursor-pointer"
          >
            <Image
              width={2}
              height={2}
              src={"/trash.svg"}
              className="w-auto h-auto"
              alt={""}
            />
            <p className="text-gray-800 opacity-40">Excluir</p>
          </button>
          <button
            onClick={() => {
              toast.error("funcionalidade não foi implementada");
            }}
            className="flex items-center gap-3 cursor-pointer"
          >
            <Image
              width={2}
              height={2}
              src={"/edit.svg"}
              className="w-auto h-auto"
              alt={""}
            />
            <p className="text-gray-800 opacity-40">Editar</p>
          </button>
        </div>
      </div>
    </div>
  );
}
