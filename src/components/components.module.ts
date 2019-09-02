import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';

// 引入ionic-angular
import { NgxEchartsModule } from 'ngx-echarts';
import { IonicModule} from '@ionic/angular';
// import { ChartsModule } from 'ng2-charts';
import { TitleComponent } from './title/title.component';
import { JadeFactoryComponent } from './jade-factory/jade-factory.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ChartsComponent } from './charts/charts.component';
import { BuyCardComponent } from './buy-card/buy-card.component';
import { SetCardComponent } from './set-card/set-card.component';
import { PayPopupComponent } from './pay-popup/pay-popup.component';
import { NetworkComponent } from './network/network.component';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    TitleComponent,
    JadeFactoryComponent,
    SidebarComponent,
    ChartsComponent,
    BuyCardComponent,
    SetCardComponent,
    PayPopupComponent,
    NetworkComponent
  ],
  entryComponents: [],
  imports: [IonicModule.forRoot(), CommonModule, NgxEchartsModule, FormsModule],
  exports: [
    TitleComponent,
    JadeFactoryComponent,
    SidebarComponent,
    ChartsComponent,
    // ChartsModule,
    BuyCardComponent,
    SetCardComponent,
    PayPopupComponent,
    NetworkComponent
  ]
})
export class ComponentsModule {}
