import { Component } from '@angular/core'
import { NavController } from 'ionic-angular'
import { engineAPI as EngineAPI } from '../../services/engineAPI'
import moment from 'moment'

@Component({
  selector:    'page-arbitrage',
  templateUrl: 'arbitrage.html'
})
export class ArbitragePage {

  chartData: any

  constructor(public navCtrl: NavController) {

  }

  ngOnInit() {
    EngineAPI.arbitrageData().subscribe( data => {
      this.chartData = this.processArbitrageData(data)
      console.log(this.chartData)
    })
  }

  public lineChartData:Array<any>   = [
    { data: this.chartData.map( result => result.high ), label: 'Opportunities'},
  ];
  public lineChartLabels:Array<any> = this.chartData.map( result => result.time )

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
    }/*,
    { // dark grey
      backgroundColor:           'rgba(77,83,96,0.2)',
      borderColor:               'rgba(77,83,96,1)',
      pointBackgroundColor:      'rgba(77,83,96,1)',
      pointBorderColor:          '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor:     'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor:           'rgba(148,159,177,0.2)',
      borderColor:               'rgba(148,159,177,1)',
      pointBackgroundColor:      'rgba(148,159,177,1)',
      pointBorderColor:          '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor:     'rgba(148,159,177,0.8)'
    }*/
  ]
  public lineChartLegend:boolean = true;
  public lineChartType:string    = 'line';



  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }



  public processArbitrageData(data) {
    //let processedData = []

    return data.reduce( ( result, opportunity ) => {
      // Convert the data into js
      let data = JSON.parse(opportunity.data)

      //console.log(data)

      let time = moment(opportunity.timestamp, 'YYYY-MM-DD H:m:s').format('YYYY-MM-DD HH:m')

      //console.log(time, 'converted')

      if ( ! result[time] ) result[time] = { time, high: 0 }  // Create new group

      //console.log(result)
      if( data.arbitrageCalculations.profitLoss > result[time].high )
        result[time].high = data.arbitrageCalculations.profitLoss

      //result[time].activity.push( { data } ) // Append to group

      //console.log(result)
      return result
    }, {} )

  }

}
