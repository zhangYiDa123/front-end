import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SetPasswordPage } from './set-password.page';

import {ComponentsModule} from '../../../components/components.module';
const routes: Routes = [
  {
    path: '',
    component: SetPasswordPage
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
  declarations: [SetPasswordPage]
})
export class SetPasswordPageModule {}
