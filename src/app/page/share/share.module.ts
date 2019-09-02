import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SharePage } from './share.page';

import { NgxQRCodeModule } from 'ngx-qrcode2';

import {ComponentsModule} from '../../../components/components.module';
const routes: Routes = [
  {
    path: '',
    component: SharePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    NgxQRCodeModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SharePage]
})
export class SharePageModule {}
