import { Component, ChangeDetectorRef, Input, Output, OnChanges, OnDestroy, SimpleChange, EventEmitter } from '@angular/core'
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
export class ArbitrageHourlyGraph implements OnChanges, OnDestroy {


  graphOptions: any
  subscription: any

  public displayHourlyGraph:    boolean     = false
  public hourToDisplay:         string      = ''
  public hourlyChartData:       Array<any>  = []
  public hourlyLineChartData:   Array<any>  = []
  public hourlyLineChartLabels: Array<any>  = []


  @Input() data: any = {}

  @Output() onOpportunityClicked = new EventEmitter<any>()



  constructor( public navCtrl: NavController, private ref: ChangeDetectorRef, private engineAPI: EngineAPI ) {
    this.graphOptions = GraphOptions.options
  }




  ngOnDestroy() {
    this.ref.detach()
    this.subscription.unsubscribe()
  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    this.showHourlyGraph(this.data)
  }





  showHourlyGraph( data: opportunityGraphInterface ): void {
    this.subscription = this.engineAPI.getByHour(data).subscribe( response => {
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
        return moment(result.time).tz('Australia/Melbourne').format('HH:mm:ssa')
      })
      this.displayHourlyGraph = true
      this.hourToDisplay      = moment(data.time).tz('Australia/Melbourne').format('HH:00a DD/MM/YYYY')
      this.ref.detectChanges()
    })
  }



  singleOpportunityClicked( event:any ):void {
    if( typeof event !== 'undefined' && typeof event.active !== 'undefined' && typeof event.active[0] !== 'undefined' ){
      this.onOpportunityClicked.emit(this.hourlyChartData[event.active[0]._index])
    }
  }



}
