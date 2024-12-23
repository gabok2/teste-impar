import { IListRepository } from "../interfaces/listRepository";
import { IPokemonItens } from "../interfaces/pokemonItens";

interface PokemonApiResponse {
  results: IPokemonItens[];
}

const BASE_URL = "https://pokeapi.co/api/v2";
const SPRITES_URL =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork";

export class ListRepository implements IListRepository {
  async fetchList(): Promise<{ name: string; image: string; id: number }[]> {
    try {
      const response = await fetch(`${BASE_URL}/pokemon?limit=100000`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: { revalidate: 3600 },
      });

      if (!response.ok) {
        throw new Error(
          `Erro ao buscar lista de pokemons: ${response.statusText}`
        );
      }

      const data = (await response.json()) as PokemonApiResponse;
      return data.results.map((item: IPokemonItens) => {
        item.url = item.url ?? "";
        const id = parseInt(item.url.split("/").filter(Boolean).pop() ?? "1");
        return {
          name: item.name,
          image: `${SPRITES_URL}/${id}.png`,
          id: id,
        };
      });
    } catch (error) {
      throw new Error(
        `Falha ao buscar pokemons: ${
          error instanceof Error ? error.message : "Erro desconhecido"
        }`
      );
    }
  }
}
