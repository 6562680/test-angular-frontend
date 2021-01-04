import {NgModule} from '@angular/core';

import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import {TodoModule} from './components/todo/todo.module';

import {AppComponent} from './app.component';
import {MomentService} from './services/moment/moment.service';

@NgModule({
  declarations: [
    AppComponent
  ],

  imports: [
    BrowserModule,
    HttpClientModule,

    TodoModule
  ],

  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
