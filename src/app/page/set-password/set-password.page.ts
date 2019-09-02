import { Component, OnInit } from '@angular/core';
import { StateMange } from '../../http/stateMange';
import { LoadingController, NavController } from '@ionic/angular';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpServeService } from '../../http/http-serve.service';

@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.page.html',
  styleUrls: ['./set-password.page.scss'],
})
export class SetPasswordPage implements OnInit {

  constructor(public loadingController: LoadingController, public http: HttpServeService, public nav: NavController) { }

  parentVal = '设置支付密码';

  phoneNumber: any = '';
  alipayAccount: any = '';

  profileForm = new FormGroup({
    paypsw: new FormControl(''),
    verifyCode: new FormControl(''),
    rePaypsw: new FormControl(''),
  });

  rules = {
    paypsw: false,
    verifyCode: false,
    rePaypsw: false,
  };

  sentMsg = '发送验证码';

  timer = null;

  flag = true;

  ngOnInit() {}

  // ionic 生命周期
  ionViewDidEnter() {
    this.phoneNumber = StateMange.getUserInfo().mobile;
    this.alipayAccount = StateMange.getUserInfo().alipayAccount;
  }

  /**
   * input框发生改变的事件
   * @param type input框改变的对像
   */
  changInput(type) {
    switch (type) {
      case 'paypsw':
        this.rules[type] = !this.profileForm.controls[type].valid;
        break;
      case 'verifyCode':
        this.rules[type] = !this.profileForm.controls[type].valid;
        break;
      case 'rePaypsw':
        this.profileForm.value.paypsw !== this.profileForm.value.rePaypsw
        ? this.rules[type] = true
        : this.rules[type] = false;
        break;
      default:
        break;
    }
  }

  // 发送手机验证码
  sentCode(flag) {
    let i = 60;
    if (flag) {
      this.flag = false;
      clearInterval(this.timer);
      this.timer = setInterval( () => {
        i--;
        this.sentMsg = `(${i}) S`;
        if (i <= 0) {
          this.sentMsg = `发送验证码`;
          this.flag = true;
          clearInterval(this.timer);
        }
      }, 1000);
      this.sentCodeFn();
    }
  }

  // 发送验证码接口
  async sentCodeFn() {
    await this.http.post('/api/v1/user/mobile/sms', {mobile: this.phoneNumber}).subscribe((info: any) => {
      if (info.status === 200) {
        this.loadingFN('短信发送成功', 2000, null);
      }
    });
  }

  async loadingFN(msg: any, time: any, spinnerState: any) {
    const loading = await this.loadingController.create({
      message: msg,
      duration: time,
      spinner: spinnerState,
    });
    await loading.present();
  }

  // 调用设置支付密码接口
  setPayPw(param: any) {
    this.http.post('/api/v1/user/token/paypsw/set', param).subscribe((info: any) => {
      if (info.status === 200) {
        this.loadingFN('支付密码设置成功', 2000, null);
        const userInfo = StateMange.getUserInfo();
        userInfo.payPsw = this.profileForm.value.paypsw;
        window.localStorage.setItem('gx_userInfo',JSON.stringify(userInfo));
        this.nav.navigateForward('/tabs/tab2');
      }
    });
  }

  submit() {
    this.setPayPw(this.profileForm.value);
  }
}
