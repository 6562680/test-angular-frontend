import {iRepoList} from "../iRepoList";
import {iRepoIndex} from "../iRepoIndex";
import {iRepoUnique} from "../iRepoUnique";

import {iRepo} from "../iRepo";
import {iModel} from "../../models/iModel";

export abstract class aMemoryRepo implements iRepo<iModel> {
  public readonly list: iRepoList<iModel> = {};
  public readonly index: iRepoIndex = {};
  public readonly unique: iRepoUnique = {};

  protected id: number = 0;


  persist(model: iModel) {
    this.id = model.id ?? this.allocateId();

    this.list[model.id] = model;

    for (let key of Object.keys(this.index)) {
      this.addIndex(key, model);
    }

    for (let key of Object.keys(this.unique)) {
      this.addUnique(key, model);
    }

    return model;
  }

  persistMany(models: iModel[]) {
    for (let idx of Object.keys(models)) {
      this.persist(models[idx]);
    }

    return models;
  }


  forget(model: iModel) {
    return model;
  }

  forgetMany(models: iModel[]) {
    for (let idx of Object.keys(models)) {
      this.forget(models[idx]);
    }

    return models;
  }


  protected allocateId(): number {
    return this.id++;
  }


  protected addIndex(key: string, model: iModel) {
    let value = this.indexValue(key, model);

    this.index[key][value][model.id] = true;

    return this;
  }

  protected addUnique(key: string, model: iModel) {
    let value = this.indexValue(key, model);

    this.unique[key][value] = model.id;

    return this;
  }


  protected removeIndex(key: string, model: iModel) {
    let value = this.indexValue(key, model);

    delete this.index[key][value][model.id];

    return this;
  }

  protected removeUnique(key: string, model: iModel) {
    let value = this.indexValue(key, model);

    delete this.unique[key][value];

    return this;
  }


  protected indexValue(key: string | string[], model: iModel): string {
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
