import {iRepoList} from "./iRepoList";
import {iRepoIndex} from "./iRepoIndex";
import {iRepoUnique} from "./iRepoUnique";
import {iRepoFilter} from "./iRepoFilter";

export interface iRepo<T> {
  list: iRepoList<T>;
  index?: iRepoIndex;
  unique?: iRepoUnique;


  all(limit: number | null, offset: number): T[];

  get(filter: iRepoFilter, limit: number | null, offset: number): T[];


  find(filter: iRepoFilter, offset: number): T;

  findById(id: string): T;


  first(filter: iRepoFilter, offset: number): T | null;


  persist(model: T): T;

  forget(model: T): T;
}
