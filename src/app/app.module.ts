import { BrowserModule } from '@angular/platform-browser'
import { ErrorHandler, NgModule } from '@angular/core'
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular'
import { ChartsModule } from 'ng2-charts'

import { MyApp } from './app.component'
import { DashboardPage } from '../pages/dashboard/dashboard'
import { ArbitrageGraph } from '../components/arbitrageGraph/arbitrageGraph'
import { ArbitrageData } from '../components/arbitrageData/arbitrageData'

import { EngineAPI } from '../services/engineAPI'

import { StatusBar } from '@ionic-native/status-bar'
import { SplashScreen } from '@ionic-native/splash-screen'

@NgModule({
  declarations: [
    MyApp,
    DashboardPage,
    ArbitrageGraph,
    ArbitrageData
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    ChartsModule
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
