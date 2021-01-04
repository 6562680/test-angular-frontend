import {Component, NgIterable, OnInit} from '@angular/core';

import {MomentService} from '../../services/moment/moment.service';

import {iRepoList} from '../../lib/repo/iRepoList';
import {iRepoIndex} from '../../lib/repo/iRepoIndex';
import {iRepoUnique} from "../../lib/repo/iRepoUnique";

import {iModelTodo} from "../../lib/models/iModelTodo";

import {TodosApi} from '../../api/todos.api';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.styl']
})
export class TodoComponent implements OnInit {
  public readonly list: iRepoList<iModelTodo> = {};
  public readonly index: iRepoIndex = {};
  public readonly unique: iRepoUnique = {};

  public readonly buffer: {
    edit: object
  } = {
    edit: {},
  };

  public readonly form: iModelTodo = {
    id: null,
    title: null,
    date: null,
  }


  constructor(
    public moment: MomentService,
    public todosApi: TodosApi
  ) {
  }


  ngOnInit(): void {
    this.todosApi.todosList()
      .subscribe(res => {
        this['list' as any] = res.data.list;
        this['index' as any] = res.data.index;
        this['unique' as any] = res.data.unique;
      });
  }


  ids(): string[] {
    return Object.keys(this.list);
  }


  edit(id) {
    this.buffer.edit[id] = true;

    this.form.id = this.list[id].id;
    this.form.title = this.list[id].title;
    this.form.date = this.list[id].date;
  }

  save(id) {
    this.buffer.edit[id] = false;

    this.list[id].id = this.form.id;
    this.list[id].title = this.form.title;
    this.list[id].date = this.form.date;
  }

  cancel(id) {
    this.buffer.edit[id] = false;
  }


  onButtonEditClick(e, id) {
    this.edit(id);
  }

  onButtonSaveClick(e, id) {
    this.save(id);
  }

  onButtonCancelClick(e, id) {
    this.cancel(id);
  }
}

