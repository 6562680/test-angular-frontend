import {NgModule} from '@angular/core';

import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from "@angular/forms";

import {TodoComponent} from './todo.component';

@NgModule({
  declarations: [
    TodoComponent
  ],

  imports: [
    BrowserModule,
    FormsModule
  ],
  exports: [
    TodoComponent
  ],

  bootstrap: [
    TodoComponent
  ]
})
export class TodoModule {
}
