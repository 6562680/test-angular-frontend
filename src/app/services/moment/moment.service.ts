import {Injectable} from '@angular/core';

import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class MomentService {
  public new(): moment.Moment {
    return moment(...arguments);
  }

  public formatUser() {
    return moment(...arguments).format('LLL');
  }
}
