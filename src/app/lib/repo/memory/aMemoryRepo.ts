import {iRepoList} from "../iRepoList";
import {iRepoIndex} from "../iRepoIndex";
import {iRepoUnique} from "../iRepoUnique";
import {iModel} from "../../models/iModel";
import {iRepo} from "../iRepo";
import {iRepoFilter} from "../iRepoFilter";

export abstract class aMemoryRepo<T extends iModel> implements iRepo<T> {
  public readonly list: iRepoList<T> = {};
  public readonly index: iRepoIndex = {};
  public readonly unique: iRepoUnique = {};

  protected id: number = 0;
  protected model: T;


  constructor(model: T) {
    this.model = model;
  }


  newModel(record: { id?: number }): T {
    let model = Object.create(this.model);

    // let id = record.id ?? null;

    for (let prop of Object.keys(record)) {
      model[prop] = record[prop];
    }

    return model;
  }


  ids(): string[] {
    return Object.keys(this.list);
  }


  all(limit: number | null, offset: number): T[] {
    let carry = [];
    for (let model in Object.values(this.list)) {
      if (!--offset) return carry;
      if (!--limit) return carry;

      carry.push(v);
    }

    return carry;
  }

  get(filter: iRepoFilter, limit: number | null, offset: number): T[] {
    return [];
  }


  find(filter: iRepoFilter, offset: number): T {
    return undefined;
  }

  findById(id: string): T {
    return this.list[id];
  }


  first(filter: iRepoFilter, offset: number): T | null {
    return undefined;
  }


  persist(model: T) {
    this.id = +model.id || this.allocateId();

    model.id = model.id ?? this.id;

    this.list['' + model.id] = model;

    for (let key of Object.keys(this.index)) {
      this.addIndex(key, model);
    }

    for (let key of Object.keys(this.unique)) {
      this.addUnique(key, model);
    }

    return model;
  }

  persistMany(models: T[]) {
    for (let idx of Object.keys(models)) {
      this.persist(models[idx]);
    }

    return models;
  }


  forget(model: T) {
    return model;
  }

  forgetMany(models: T[]) {
    for (let idx of Object.keys(models)) {
      this.forget(models[idx]);
    }

    return models;
  }


  protected allocateId(): number {
    return this.id++;
  }


  protected addIndex(key: string, model: T) {
    let value = this.indexValue(key, model);

    this.index[key][value]['' + model.id] = true;

    return this;
  }

  protected addUnique(key: string, model: T) {
    let value = this.indexValue(key, model);

    this.unique[key][value] = '' + model.id;

    return this;
  }


  protected removeIndex(key: string, model: T) {
    let value = this.indexValue(key, model);

    delete this.index[key][value][model.id];

    return this;
  }

  protected removeUnique(key: string, model: T) {
    let value = this.indexValue(key, model);

    delete this.unique[key][value];

    return this;
  }


  protected indexValue(key: string | string[], model: T): string {
    key = [].concat(key)
      .reduce((carry, v) => {
        return carry.concat(v.split('.'));
      }, []);

    let value = [];
    for (let prop of key) {
      value.push(model[prop]);
    }

    return value.join("\0");
  }
}
