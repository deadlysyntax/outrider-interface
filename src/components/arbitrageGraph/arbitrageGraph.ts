import { Component, OnInit, ChangeDetectorRef, Output, EventEmitter} from '@angular/core'
import { NavController } from 'ionic-angular'
import { EngineAPI } from '../../services/engineAPI.service'
import { GraphOptions } from '../../services/graphOptions.service'
//import * as moment from 'moment-timezone'


@Component({
  selector:    'arbitrage-graph',
  templateUrl: 'arbitrageGraph.html',
//  encapsulation: ViewEncapsulation.None
})
export class ArbitrageGraph implements OnInit {

  public chartData:       any        = []
  public lineChartData:   Array<any> = []
  public lineChartLabels: Array<any> = []

  graphOptions: any;

  constructor( public navCtrl: NavController, private ref: ChangeDetectorRef, private engineAPI: EngineAPI) {
    this.graphOptions = GraphOptions.options
  }


  @Output()
  onHourClicked = new EventEmitter<any>()



  ngOnInit() {
    this.getGraphData()
    setInterval(this.getGraphData.bind(this), 20000)
  }







  getGraphData(): void {
    //
    this.engineAPI.arbitrageData().subscribe( data => {
      this.chartData = data.reverse() //this.processArbitrageData(data)
      // Chart Data
      this.lineChartData = [
        { data: this.chartData.map( result => result.high ), label: 'Profit High' },
      //  { data: this.chartData.map( result => result.low ).reverse(), label: 'Profit Low' }
      ]
      // Chart Labels
      this.lineChartLabels = this.chartData.map( result => {
        return result.time
      })
      this.ref.detectChanges()
    })
  }






  // events
  chartClicked(event:any):void {
    this.onHourClicked.emit(this.chartData[event.active[0]._index])
  }






}
