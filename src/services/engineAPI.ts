import * as request from 'request-promise'
import { Observable } from 'rxjs/Observable'
//import { Observer } from 'rxjs/Observer'
import 'rxjs/add/observable/fromPromise'

import { Injectable } from '@angular/core';
//import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class EngineAPI {

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


  getArbitrageLatest(): any {
    let options = {
      uri: `${this.baseURL}/arbitrage/latest`,
      headers: {
        'User-Agent': 'Request-Promise'
      },
      json: true // Automatically parses the JSON string in the response
    };
    return request(options)
  }




  public arbitrageData(): Observable<any> {
    return Observable
    .fromPromise(
      this.getArbitrageData()
    )
  }




  public getLatest(): Observable<any> {
    return Observable
    .fromPromise(
      this.getArbitrageLatest()
    )
  }


}
