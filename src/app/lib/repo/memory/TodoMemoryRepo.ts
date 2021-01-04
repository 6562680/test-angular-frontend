import {Injectable} from "@angular/core";

import {TodoModule} from "../../../components/todo/todo.module";

import {iRepo} from "../iRepo";
import {iRepoList} from "../iRepoList";
import {iRepoIndex} from "../iRepoIndex";
import {iRepoUnique} from "../iRepoUnique";

import {iModelTodo} from "../../models/iModelTodo";

import {aMemoryRepo} from "./aMemoryRepo";

@Injectable({
  providedIn: TodoModule
})
export class TodoMemoryRepo extends aMemoryRepo implements iRepo<iModelTodo> {
  public readonly list: iRepoList<iModelTodo> = {};
  public readonly index: iRepoIndex = {
    group: {}
  };
  public readonly unique: iRepoUnique = {
    id: {},
  };
}
