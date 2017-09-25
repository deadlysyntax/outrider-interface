import * as request from 'request-promise'
import { Observable } from 'rxjs/Observable'
//import { Observer } from 'rxjs/Observer'
import 'rxjs/add/observable/fromPromise'

import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
class EngineAPI {

  baseURL: string

  constructor() {
    this.baseURL = `http://localhost:9999`
  }


  getArbitrageData(): any {
    let options = {
      uri: `${this.baseURL}/arbitrage/data`,
      headers: {
        'User-Agent': 'Request-Promise'
      },
      json: true // Automatically parses the JSON string in the response
    };
    return request(options)
  }



  arbitrageData(): Observable<any> {
    return Observable
    .fromPromise(
      this.getArbitrageData()
    )
  }
}

export let engineAPI = new EngineAPI()
