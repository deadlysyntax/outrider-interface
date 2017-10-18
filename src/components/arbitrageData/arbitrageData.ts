import { Component, OnInit, OnDestroy, ChangeDetectorRef} from '@angular/core'
import { NavController } from 'ionic-angular'
import { EngineAPI } from '../../services/engineAPI.service'
import moment from 'moment-timezone'


//import OpportunityData from '../presentation/opportunityData/opportunityData'

@Component({
  selector:    'arbitrage-data',
  templateUrl: 'arbitrageData.html'
})
export class ArbitrageData implements OnInit, OnDestroy {

  public latest:        any
  private subscription: any
  private interval:     any

  constructor(public navCtrl: NavController, private ref: ChangeDetectorRef, private engineAPI: EngineAPI) {}



  ngOnInit() {
    this.getData()
    this.interval = setInterval(this.getData.bind(this), 5000)
  }


  ngOnDestroy() {
    this.ref.detach()
    this.subscription.unsubscribe()
    clearInterval(this.interval)
  }



  getData(){
    this.subscription = this.engineAPI.getLatest().subscribe( response => {
      this.latest = {
        timestamp: moment(Math.floor(response[0].timestamp)).tz('Australia/Melbourne').format('HH:mm:ss DD/MM/YYYY'),
        data:      response[0]
      }
      this.ref.detectChanges()
    })
  }



}
