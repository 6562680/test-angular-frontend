import {iRepoList} from "./iRepoList";
import {iRepoIndex} from "./iRepoIndex";
import {iRepoUnique} from "./iRepoUnique";

export interface iRepo<T> {
  list: iRepoList<T>;
  index?: iRepoIndex;
  unique?: iRepoUnique;

  persist(model: T): T;

  forget(model: T): T;
}
