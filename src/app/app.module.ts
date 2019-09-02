import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { Network } from '@ionic-native/network/ngx';
import { Vibration } from '@ionic-native/vibration/ngx';
import { Keyboard } from '@ionic-native/keyboard/ngx';
// 自定义组件
import { ComponentsModule } from '../components/components.module';
// import { IonFocusDirective } from './directive/ion-focus.directive';
import { LoginGuardGuard } from '../app/guard/login-guard.guard';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    LoginGuardGuard,
    StatusBar,
    SplashScreen,
    Network,
    Vibration,
    Keyboard,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private statusBar: StatusBar) {
    this.statusBar.overlaysWebView(true);
    this.statusBar.backgroundColorByHexString('#fff');
    // this.keyBoard.disableScroll(true);
  }

}
