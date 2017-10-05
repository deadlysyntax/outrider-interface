import { Component, OnInit, ChangeDetectorRef, ViewEncapsulation} from '@angular/core'
import { NavController } from 'ionic-angular'
import { EngineAPI } from '../../services/engineAPI'
//import moment from 'moment'



export interface opportunityGraphInterface {
  time: string;
  high: number;
  low:  number;
}


export interface hourlyOpportunityGraphInterface {
  time: string;
}





@Component({
  selector:    'arbitrage-graph',
  templateUrl: 'arbitrageGraph.html',
  //styleUrls: [
  //  '../../../node_modules/nvd3/build/nv.d3.css'
  //],
  encapsulation: ViewEncapsulation.None
})
export class ArbitrageGraph implements OnInit {



  public chartData:       any        = []
  public lineChartData:   Array<any> = []
  public lineChartLabels: Array<any> = []
  public lineChartOptions:any        = {
    responsive: true,
    borderWidth: 1
  }
  public lineChartColors:Array<any>  = [
    { // grey
      backgroundColor:           'rgba(148,159,177,0.2)',
      borderColor:               'rgba(148,159,177,1)',
      pointBackgroundColor:      'rgba(148,159,177,1)',
      pointBorderColor:          '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor:     'rgba(148,159,177,0.8)'
    },
    { // grey
      backgroundColor:           'rgba(108,59,77,0.2)',
      borderColor:               'rgba(108,59,77,1)',
      pointBackgroundColor:      'rgba(28,129,127,1)',
      pointBorderColor:          '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor:     'rgba(148,159,177,0.8)'
    }
  ]
  public lineChartLegend:boolean  = true
  public lineChartType:string     = 'line'





  constructor( public navCtrl: NavController, private ref: ChangeDetectorRef, private engineAPI: EngineAPI ) {}


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
    this.showHourlyGraph(this.chartData[event.active[0]._index])
  }



  showHourlyGraph( data: opportunityGraphInterface ): void {
    this.engineAPI.getByHour(data).subscribe( response => {
      console.log(response)
    })
  }




}
