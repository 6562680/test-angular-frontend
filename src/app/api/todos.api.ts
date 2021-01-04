import {Injectable} from '@angular/core';

import {Observable} from 'rxjs';

import {environment} from '../../environments/environment';

import {HttpService} from '../services/http/http.service';

import {iRepoData} from "../lib/repo/iRepoData";
import {iModelTodo} from "../lib/models/iModelTodo";

@Injectable({
  providedIn: 'root',
})
export class TodosApi {
  protected http: HttpService;

  constructor(http: HttpService) {
    this.http = http;
  }

  public todosList(): Observable<iRepoData<iModelTodo>> {
    // @ts-ignore
    return this.http.get(environment.api + '/api/v1/todos');
  }
}
