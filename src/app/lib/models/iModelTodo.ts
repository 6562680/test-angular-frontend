import {iModel} from "./iModel";

export interface iModelTodo extends iModel {
  title: string,
  date: Date
}
