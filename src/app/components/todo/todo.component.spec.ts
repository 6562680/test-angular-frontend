import {TestBed} from '@angular/core/testing';

import {TodoComponent} from './todo.component';

describe('TodoComponent', () => {
  beforeEach(async () => {
    await TestBed
      .configureTestingModule({
        declarations: [
          TodoComponent
        ],
      })
      .compileComponents();
  });
});
