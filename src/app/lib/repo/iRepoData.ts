import {iRepoList} from "./iRepoList";
import {iRepoIndex} from "./iRepoIndex";
import {iRepoUnique} from "./iRepoUnique";

export interface iRepoData<T> {
  data: {
    list: iRepoList<T>;
    index?: iRepoIndex;
    unique?: iRepoUnique;
  },
}
