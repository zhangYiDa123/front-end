import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SellJadePage } from './sell-jade.page';

import {ComponentsModule} from '../../../components/components.module';
const routes: Routes = [
  {
    path: '',
    component: SellJadePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SellJadePage]
})
export class SellJadePageModule {}
