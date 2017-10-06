import { Component, ChangeDetectorRef, Input, OnChanges, SimpleChange } from '@angular/core'
import { NavController } from 'ionic-angular'
import { EngineAPI } from '../../services/engineAPI.service'
import * as moment from 'moment-timezone'
import { GraphOptions } from '../../services/graphOptions.service'

export interface opportunityGraphInterface {
  time: string;
  high: number;
  low:  number;
}


export interface hourlyOpportunityGraphInterface {
  time: string;
}




@Component({
  selector:    'arbitrage-hourly-graph',
  templateUrl: 'arbitrageHourlyGraph.html',
})
export class ArbitrageHourlyGraph {


  graphOptions: any


  public displayHourlyGraph:    boolean     = false
  public hourToDisplay:         string      = ''
  public hourlyChartData:       Array<any>  = []
  public hourlyLineChartData:   Array<any>  = []
  public hourlyLineChartLabels: Array<any>  = []


  @Input() data: any = {}

  constructor( public navCtrl: NavController, private ref: ChangeDetectorRef, private engineAPI: EngineAPI ) {
    this.graphOptions = GraphOptions.options
  }






  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {

    this.showHourlyGraph(this.data)

  }





  showHourlyGraph( data: opportunityGraphInterface ): void {
    this.engineAPI.getByHour(data).subscribe( response => {
      this.hourlyChartData = response

      // Chart Data
      this.hourlyLineChartData = [
        { data: this.hourlyChartData.map( result => {
          return result.data[0].arbitrageCalculations.profitLoss
        }),
        label: 'Profit' }
      ]
      // Chart Labels
      this.hourlyLineChartLabels = this.hourlyChartData.map( result => {
        return result.time
      })
      this.displayHourlyGraph = true
      this.hourToDisplay      = moment(data.time, 'YYYY-MM-DD HH').tz('Australia/Melbourne').format('HH:00a DD/MM/YYYY')
      this.ref.detectChanges()

    })
  }


  hourlyChartClicked(event:any):void {
//    this.selectHourlyCharts( this.showSingleOpportunity(this.hourlyChartData[event.active[0]._index]) )
  }




}
