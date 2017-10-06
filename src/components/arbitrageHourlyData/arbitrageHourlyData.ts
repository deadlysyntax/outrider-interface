import { Component, Input } from '@angular/core'


@Component({
  selector:    'arbitrage-hourly-data',
  templateUrl: 'arbitrageHourlyData.html'
})
export class ArbitrageHourlyData {


  @Input()
  opportunity:any;



}
