import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { StateMange } from '../http/stateMange';
import { ActivatedRoute, Params, Router } from '@angular/router';
@Component({
  selector: 'app-tab5',
  templateUrl: 'tab5.page.html',
  styleUrls: ['tab5.page.scss']
})
export class Tab5Page {
  constructor(
    public nav: NavController,
    public activeRoute: ActivatedRoute,
    public router: Router,
    ) {}
  userInfo: any = '';
  // 跳转到玉佩页面
  toJadePage() {
    this.nav.navigateForward('my-jade');
  }

  // 跳转个人设置页面
  toSetPage() {
    this.nav.navigateForward('setting');
  }

  // 跳转到邀请好友页面
  invitation() {
    this.nav.navigateForward('share');
  }

  // 跳转玩转国学页面
  toPlayPage() {
    this.nav.navigateForward('play');
  }

  // 跳转学识页面
  mylearn() {
    this.nav.navigateForward('learning');
  }

  // 跳转个人信息页面
  personalInfo() {
    this.nav.navigateForward('personal-info');
  }

  // 跳转到客服页面
  toCustomerPage() {
    this.nav.navigateForward('customer');
  }

  // 跳转到商城订单
  toShopOrderPage() {
    // my-order-list
    this.router.navigate(['/order-list'], {
      queryParams: {
        params: 1
      }
    });
  }

  // 跳转到出售玉佩页面
  sellJadePage() {
    this.nav.navigateForward('sell-jade');
  }

  // ionic 生命周期 进入页面后触发
  ionViewDidEnter() {
    // 进入页面获取用户信息
    this.userInfo = StateMange.getUserInfo();
    this.userInfo.jade = (this.userInfo.jade).toFixed(6);
  }
}
