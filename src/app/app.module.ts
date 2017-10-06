import { BrowserModule } from '@angular/platform-browser'
import { ErrorHandler, NgModule } from '@angular/core'
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular'
import { ChartsModule } from 'ng2-charts'
import { NvD3Module } from 'ng2-nvd3'

import { MyApp } from './app.component'
import { DashboardPage } from '../pages/dashboard/dashboard'
import { ArbitrageGraph } from '../components/arbitrageGraph/arbitrageGraph'
import { ArbitrageData } from '../components/arbitrageData/arbitrageData'
import { ArbitrageHourlyGraph } from '../components/arbitrageHourlyGraph/arbitrageHourlyGraph'
import OpportunityData from '../components/presentation/opportunityData/opportunityData'

import { EngineAPI } from '../services/engineAPI.service'
import { GraphOptions }  from '../services/graphOptions.service'



import { StatusBar } from '@ionic-native/status-bar'
import { SplashScreen } from '@ionic-native/splash-screen'

@NgModule({
  declarations: [
    MyApp,
    DashboardPage,
    ArbitrageGraph,
    ArbitrageData,
    OpportunityData,
    ArbitrageHourlyGraph
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    ChartsModule,
    NvD3Module
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    DashboardPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    EngineAPI
  ]
})
export class AppModule {}
