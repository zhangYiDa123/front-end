import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { InvitationHistoryPage } from './invitation-history.page';

import {ComponentsModule} from '../../../components/components.module';

const routes: Routes = [
  {
    path: '',
    component: InvitationHistoryPage
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
  declarations: [InvitationHistoryPage]
})
export class InvitationHistoryPageModule {}
