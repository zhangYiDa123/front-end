import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { LoginGuardGuard } from '../guard/login-guard.guard';
const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        data: {needLogin: false, needUpDataUserInfo: true},
        canActivate: [LoginGuardGuard],
        children: [
          {
            path: '',
            loadChildren: '../tab1/tab1.module#Tab1PageModule',
          }
        ]
      },
      {
        path: 'tab2',
        data: {needLogin: false, needUpDataUserInfo: false},
        canActivate: [LoginGuardGuard],
        children: [
          {
            path: '',
            loadChildren: '../tab2/tab2.module#Tab2PageModule',
          }
        ]
      },
      {
        path: 'tab3',
        data: {needLogin: false, needUpDataUserInfo: false},
        canActivate: [LoginGuardGuard],
        children: [
          {
            path: '',
            loadChildren: '../tab3/tab3.module#Tab3PageModule',
          }
        ]
      },
      {
        path: 'tab4',
        data: {needLogin: false, needUpDataUserInfo: false},
        canActivate: [LoginGuardGuard],
        children: [
          {
            path: '',
            loadChildren: '../tab4/tab4.module#Tab4PageModule',
          }
        ]
      },
      {
        path: 'tab5',
        data: {needLogin: true, needUpDataUserInfo: true},
        canActivate: [LoginGuardGuard],
        children: [
          {
            path: '',
            loadChildren: '../tab5/tab5.module#Tab5PageModule',
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
