import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AddressPage } from './address.page';

import {ComponentsModule} from '../../../components/components.module';

import { IonFocusDirective } from '../../directive/ion-focus.directive';
const routes: Routes = [
  {
    path: '',
    component: AddressPage
  }
];

@NgModule({
  declarations: [AddressPage, IonFocusDirective],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    RouterModule.forChild(routes)
  ],
})
export class AddressPageModule {}
