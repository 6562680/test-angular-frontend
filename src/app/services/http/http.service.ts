import {Injectable} from '@angular/core';

import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(http: HttpClient) {
    const service = this;

    // @ts-ignore
    return new Proxy(http, {
      apply(target, thisArg, args): any {
        const handler = () => {
          const proxyArgs = [args[0], {...service.getConfig(), ...args[1]}];

          // @ts-ignore
          return target.apply(thisArg, proxyArgs);
        };

        const map = {
          get: handler,
          post: handler,
        };

        // @ts-ignore
        return target.apply(thisArg, args);
      },
    });
  }

  getConfig(): object {
    return {
      // headers?: HttpHeaders | {[header: string]: string | string[]},
      // observe?: 'body' | 'events' | 'response',
      // params?: HttpParams|{[param: string]: string | string[]},
      // reportProgress?: boolean,
      // responseType?: 'arraybuffer'|'blob'|'json'|'text',
      // withCredentials?: boolean
    };
  }
}
