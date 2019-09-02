import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-speedup',
  templateUrl: './speedup.page.html',
  styleUrls: ['./speedup.page.scss'],
})
export class SpeedupPage implements OnInit {

  constructor(public nav: NavController) { }
  parentVal = '加速';
  ngOnInit() {
  }

  // 跳转到其它页面
  toPage(id: any) {
    switch (id) {
      case 1: // 前住邀请好友页面
        this.nav.navigateForward('/share');
        break;
      case 2: // 前住商城页面
        this.nav.navigateForward('/tabs/tab4');
        break;
      case 3: // 前住交易页面
        this.nav.navigateForward('/tabs/tab2');
        break;
      case 4: // 前住礼拜页面
        this.nav.navigateForward('/tabs/tab3');
        break;
      case 5: // 前住实名认证页面
        this.nav.navigateForward('/real-name');
        break;
      default:
        break;
    }
  }

}
