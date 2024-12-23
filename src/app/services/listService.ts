import { IListRepository } from "../interfaces/listRepository";

export interface ListService {
  fetchList: () => Promise<
    {
      name: string;
      image: string;
    }[]
  >;
}

export function listService(listRepository: IListRepository): ListService {
  async function fetchList() {
    return await listRepository.fetchList();
  }

  return { fetchList };
}
