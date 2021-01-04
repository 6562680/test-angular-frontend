import {Component, NgIterable, OnInit} from '@angular/core';

import {MomentService} from '../../services/moment/moment.service';

import {iRepoList} from '../../lib/repo/iRepoList';
import {iRepoIndex} from '../../lib/repo/iRepoIndex';
import {iRepoUnique} from "../../lib/repo/iRepoUnique";

import {iModelTodo} from "../../lib/models/iModelTodo";

import {TodoApi} from '../../api/todo-api.service';
import {TodoMemoryRepo} from "../../lib/repo/memory/TodoMemoryRepo";

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.styl']
})
export class TodoComponent implements OnInit {
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
    public todoApi: TodoApi,
    public todoRepo: TodoMemoryRepo
  ) {
  }


  ngOnInit(): void {
    this.todoApi.todosList()
      .subscribe(res => {
        this.todoRepo.persistMany(Object.values(res.data.list));
      });
  }


  ids(): string[] {
    return this.todoRepo.ids();
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

