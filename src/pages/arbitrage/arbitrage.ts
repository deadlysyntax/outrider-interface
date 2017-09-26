import { Component, OnInit, ChangeDetectorRef} from '@angular/core'
import { NavController } from 'ionic-angular'
import { engineAPI as EngineAPI } from '../../services/engineAPI'
import moment from 'moment'

@Component({
  selector:    'page-arbitrage',
  templateUrl: 'arbitrage.html'
})
export class ArbitragePage implements OnInit {

  public chartData:       any        = []
  public lineChartData:   Array<any> = []
  public lineChartLabels: Array<any> = []



  constructor(public navCtrl: NavController, private ref: ChangeDetectorRef) {
  }



  ngOnInit() {
    this.getGraphData()
    let x = setInterval(this.getGraphData.bind(this), 20000)
  }



  public lineChartOptions:any       = {
    responsive: true
  }

  public lineChartColors:Array<any> = [
    { // grey
      backgroundColor:           'rgba(148,159,177,0.2)',
      borderColor:               'rgba(148,159,177,1)',
      pointBackgroundColor:      'rgba(148,159,177,1)',
      pointBorderColor:          '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor:     'rgba(148,159,177,0.8)'
    }
  ]
  public lineChartLegend:boolean = true
  public lineChartType:string    = 'line'




  getGraphData(): void {
    //
    EngineAPI.arbitrageData().subscribe( data => {
      this.chartData = this.processArbitrageData(data)
      // Chart Data
      this.lineChartData = [
        { data: this.chartData.map( result => result.high ), label: 'Opportunities' }
      ]
      // Chart Labels
      this.lineChartLabels = this.chartData.map( result => {
        return result.time
      })
      this.ref.detectChanges()
    })
  }



  // events
  chartClicked(e:any):void {
    console.log(e);
  }

  chartHovered(e:any):void {
    console.log(e);
  }


  // Format the data in how we want our chart to recieve it
  processArbitrageData(data) {
    let processedData = []
    //
    let compiledData = data.reduce( ( result, opportunity ) => {
      // Convert the data into js
      let data = JSON.parse(opportunity.data)
      // We use the date/time as our label
      let time = moment(opportunity.timestamp, 'YYYY-MM-DD H:m:s').format('YYYY-MM-DD HH:mm')
      // Create a fresh one other wise we're manipulating the previous iteration of the reducer
      if ( ! result[time] ) result[time] = { time, high: 0 }  // Create new group
      // Add the high for this time span
      if( data.arbitrageCalculations.profitLoss > result[time].high )
        result[time].high = data.arbitrageCalculations.profitLoss
      return result
    }, {} )
    //
    for( let key in compiledData )
      processedData.push(compiledData[key])
    //
    return processedData
  }

}
