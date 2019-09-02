import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ForgetPWPage } from './forget-pw.page';

import {ComponentsModule} from '../../components/components.module';
const routes: Routes = [
  {
    path: '',
    component: ForgetPWPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ForgetPWPage]
})
export class ForgetPWPageModule {}
