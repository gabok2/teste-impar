export interface IListRepository {
  fetchList: () => Promise<
    {
      name: string;
      image: string;
    }[]
  >;
}
