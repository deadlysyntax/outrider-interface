import { Component, Input } from '@angular/core'



//import OpportunityData from '../presentation/opportunityData/opportunityData'

@Component({
  selector:    'arbitrage-hourly-data',
  templateUrl: 'arbitrageHourlyData.html'
})
export class ArbitrageHourlyData {


  @Input()
  opportunity:any;




}
