import { Injectable } from '@angular/core';

@Injectable()
class GraphOptionsService {

  public options: any = {}

  constructor() {
    this.options = {
      lineChartOptions: {
        responsive: true,
        borderWidth: 1
      },
      lineChartColors:[
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
      ],
      lineChartLegend: true,
      lineChartType:  'line'
    }
  }
}

export let GraphOptions = new GraphOptionsService()
