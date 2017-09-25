import { Component } from '@angular/core'
import { NavController } from 'ionic-angular'
import { engineAPI as EngineAPI } from '../../services/engineAPI'
import moment from 'moment'

@Component({
  selector:    'page-arbitrage',
  templateUrl: 'arbitrage.html'
})
export class ArbitragePage {

  chartData:       any          = []
  lineChartData:   Array<any>   = []
  lineChartLabels: Array<any>   = []

  constructor(public navCtrl: NavController) {
    this.navCtrl = navCtrl
  }

  ngOnInit() {
    this.getGraphData()
  }

  lineChartOptions:any       = {
    responsive: true
  }

  lineChartColors:Array<any> = [
    { // grey
      backgroundColor:           'rgba(148,159,177,0.2)',
      borderColor:               'rgba(148,159,177,1)',
      pointBackgroundColor:      'rgba(148,159,177,1)',
      pointBorderColor:          '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor:     'rgba(148,159,177,0.8)'
    }
  ]
  lineChartLegend:boolean = true
  lineChartType:string    = 'line'


  getGraphData(): void {
    EngineAPI.arbitrageData().subscribe( data => {
      this.chartData = this.processArbitrageData(data)
      //
      this.lineChartData  = [
        { data: this.chartData.map( result => result.high ), label: 'Opportunities' }
      ]
      //
      this.lineChartLabels = this.chartData.map( result => result.time )
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
