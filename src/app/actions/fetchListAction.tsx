"use server";

import { ListRepository } from "../repositories/listRepository";
import { listService } from "../services/listService";

export async function fetchListAction() {
  const listPokemonRepository = new ListRepository();
  const listPokemonService = listService(listPokemonRepository);
  const listPokemon = await listPokemonService.fetchList();

  return listPokemon;
}
