import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpServeService } from '../../http/http-serve.service';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-real-name-result',
  templateUrl: './real-name-result.page.html',
  styleUrls: ['./real-name-result.page.scss'],
})
export class RealNameResultPage implements OnInit {

  constructor(public http: HttpServeService, public sanitizer: DomSanitizer, public nav: NavController) { }
  parentVal = '实名认证';
  name: any = '';
  idCard: any = '';
  alipayAccount: any = '';
  htmlImg: any = '';
  authFlagStr: any = null;
  loadingState: any = true;
  isPay: any = false;
  ngOnInit() {}

  assembleHTML(strHTML: any) {
    return this.sanitizer.bypassSecurityTrustHtml(strHTML);
  }

  // 获取实名认证的结果
  getRealName() {
    this.http.post('/api/v1/user/token/auth-info/get').subscribe((info: any) => {
      if (info.status === 200 ) {
        [this.name, this.idCard, this.alipayAccount, this.authFlagStr, this.isPay]
        =
        [info.data.realname, info.data.idCard, info.data.alipayAccount,
          info.data ? info.data.authFlagStr : null, info.data ? info.data.isPay : false];
        if (this.authFlagStr === '待审核' && !this.isPay) {
          this.getPay();
        }
      }
    });
  }

  // 重新审核
  again() {
    this.nav.navigateForward('real-name');
  }

  // 前往交易
  toTrade() {
    this.nav.navigateForward('/tabs/tab2');
  }

  // 获取用户需要支付的二维码
  getPay() {
    this.http.post('/api/v1/user/token/auth/qrcode').subscribe((info: any) => {
      if (info.status === 200) {
        this.htmlImg = this.assembleHTML(info.data.img);
        this.loadingState = false;
      }
    });
  }

  // ionic的生命周期
  ionViewDidEnter() {
    this.getRealName();
  }

}
