import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginGuardGuard } from '../app/guard/login-guard.guard';
const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule',
  data: {needLogin: false, needUpDataUserInfo: true}, canActivate: [LoginGuardGuard]},
  { path: 'login', loadChildren: './login/login.module#LoginPageModule',
  data: {needLogin: false, needUpDataUserInfo: false}, canActivate: [LoginGuardGuard] },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule',
  data: {needLogin: false, needUpDataUserInfo: false}, canActivate: [LoginGuardGuard] },
  { path: 'forget-pw', loadChildren: './forget-pw/forget-pw.module#ForgetPWPageModule',
  data: {needLogin: false, needUpDataUserInfo: false}, canActivate: [LoginGuardGuard] },
  { path: 'ranking', loadChildren: './page/ranking/ranking.module#RankingPageModule',
  data: {needLogin: false, needUpDataUserInfo: false}, canActivate: [LoginGuardGuard] },
  { path: 'speedup', loadChildren: './page/speedup/speedup.module#SpeedupPageModule',
  data: {needLogin: false, needUpDataUserInfo: false}, canActivate: [LoginGuardGuard] },
  { path: 'rules', loadChildren: './page/rules/rules.module#RulesPageModule',
  data: {needLogin: false, needUpDataUserInfo: false}, canActivate: [LoginGuardGuard] },
  { path: 'goods-details', loadChildren: './page/goods-details/goods-details.module#GoodsDetailsPageModule',
  data: {needLogin: false, needUpDataUserInfo: false}, canActivate: [LoginGuardGuard] },
  { path: 'order', loadChildren: './page/order/order.module#OrderPageModule',
  data: {needLogin: false, needUpDataUserInfo: false}, canActivate: [LoginGuardGuard] },
  { path: 'address', loadChildren: './page/address/address.module#AddressPageModule',
  data: {needLogin: true, needUpDataUserInfo: false}, canActivate: [LoginGuardGuard] },
  { path: 'order-list', loadChildren: './page/order-list/order-list.module#OrderListPageModule',
  data: {needLogin: true, needUpDataUserInfo: false}, canActivate: [LoginGuardGuard] },
  { path: 'set-password', loadChildren: './page/set-password/set-password.module#SetPasswordPageModule',
  data: {needLogin: true, needUpDataUserInfo: false}, canActivate: [LoginGuardGuard] },
  { path: 'my-order-list', loadChildren: './page/my-order-list/my-order-list.module#MyOrderListPageModule',
  data: {needLogin: true, needUpDataUserInfo: false}, canActivate: [LoginGuardGuard] },
  { path: 'order-details', loadChildren: './page/order-details/order-details.module#OrderDetailsPageModule',
  data: {needLogin: true, needUpDataUserInfo: false}, canActivate: [LoginGuardGuard] },
  { path: 'sell-jade', loadChildren: './page/sell-jade/sell-jade.module#SellJadePageModule',
   data: {needLogin: true, needUpDataUserInfo: false}, canActivate: [LoginGuardGuard] },
  { path: 'setting', loadChildren: './page/setting/setting.module#SettingPageModule',
  data: {needLogin: false, needUpDataUserInfo: false}, canActivate: [LoginGuardGuard] },
  { path: 'share', loadChildren: './page/share/share.module#SharePageModule',
  data: {needLogin: true, needUpDataUserInfo: false}, canActivate: [LoginGuardGuard] },
  { path: 'invitation-history', loadChildren: './page/invitation-history/invitation-history.module#InvitationHistoryPageModule',
  data: {needLogin: true, needUpDataUserInfo: false}, canActivate: [LoginGuardGuard] },
  { path: 'play', loadChildren: './page/play/play.module#PlayPageModule',
  data: {needLogin: true, needUpDataUserInfo: false}, canActivate: [LoginGuardGuard] },
  { path: 'learning', loadChildren: './page/learning/learning.module#LearningPageModule',
  canActivate: [LoginGuardGuard], data: {needLogin: true, needUpDataUserInfo: false} },
  { path: 'my-jade', loadChildren: './page/my-jade/my-jade.module#MyJadePageModule',
  canActivate: [LoginGuardGuard], data: {needLogin: true, needUpDataUserInfo: false} },
  { path: 'personal-info', loadChildren: './page/personal-info/personal-info.module#PersonalInfoPageModule',
  canActivate: [LoginGuardGuard], data: {needLogin: true, needUpDataUserInfo: false} },
  { path: 'real-name', loadChildren: './page/real-name/real-name.module#RealNamePageModule',
  canActivate: [LoginGuardGuard], data: {needLogin: true, needUpDataUserInfo: false}},
  { path: 'real-name-result', loadChildren: './page/real-name-result/real-name-result.module#RealNameResultPageModule',
   canActivate: [LoginGuardGuard], data: {needLogin: true, needUpDataUserInfo: false}},
  { path: 'customer', loadChildren: './page/customer/customer.module#CustomerPageModule',
  data: {needLogin: false, needUpDataUserInfo: false}, canActivate: [LoginGuardGuard] },
  { path: 'sell-details', loadChildren: './page/sell-details/sell-details.module#SellDetailsPageModule',
  data: {needLogin: true, needUpDataUserInfo: false}, canActivate: [LoginGuardGuard] },
  { path: 'address-list', loadChildren: './page/address-list/address-list.module#AddressListPageModule',
  data: {needLogin: true, needUpDataUserInfo: false}, canActivate: [LoginGuardGuard] },  { path: 'pay-page', loadChildren: './page/pay-page/pay-page.module#PayPagePageModule' },



];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
