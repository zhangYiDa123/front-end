import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpServeService } from '../http/http-serve.service';

@Component({
  selector: 'app-forget-pw',
  templateUrl: './forget-pw.page.html',
  styleUrls: ['./forget-pw.page.scss'],
})

export class ForgetPWPage implements OnInit {
  parentVal = '修改密码';
  constructor(public nav: NavController, public loadingController: LoadingController, public http: HttpServeService) { }

  profileForm = new FormGroup({
    mobile: new FormControl(''),
    verifyCode: new FormControl(''),
    password: new FormControl(''),
    rePassword: new FormControl(''),
  });

  rules = {
    mobile: false,
    verifyCode: false,
    password: false,
    rePassword: false
  };

  sentMsg = '发送验证码';

  timer = null;

  flag = true;

  ngOnInit() {
  }

  /**
   * input框发生改变的事件
   * @param type input框改变的对像
   */
  changInput(type) {
    switch (type) {
      case 'mobile':
        this.rules[type] = !this.profileForm.controls[type].valid;
        break;
      case 'verifyCode':
        this.rules[type] = !this.profileForm.controls[type].valid;
        break;
      case 'password':
        this.rules[type] = !this.profileForm.controls[type].valid;
        break;
      case 'rePassword':
        this.profileForm.value.rePassword !== this.profileForm.value.password
        ? this.rules[type] = true
        : this.rules[type] = false;
        break;
      default:
        break;
    }
  }

  async loadingFN(msg: any, time: any, spinnerState: any) {
    const loading = await this.loadingController.create({
      message: msg,
      duration: time,
      spinner: spinnerState,
    });
    await loading.present();
  }

  // 发送验证码接口
  async sentCodeFn() {
    await this.http.post('/api/v1/user/mobile/sms', {mobile: this.profileForm.value.mobile}).subscribe((info: any) => {
      if (info.status === 200) {
        this.loadingFN('短信发送成功', 2000, null);
      }
    });
  }

  // 发送手机验证码
  sentCode(flag) {
    if (!this.profileForm.controls.mobile.valid) {
      this.loadingFN('请填写手机及正确格式的手机', 2000, null);
      return false;
    }
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

  // 修改密码接口
  alterPw(param: any) {
    this.http.post('/api/v1/user/password/forget', param).subscribe((info: any) => {
      if (info.status === 200) {
        this.loadingFN(info.msg, 2000, null);
        this.nav.navigateForward('login');
      }
    });
  }

  // 确认修改
  async submitFn() {
    console.log(this.profileForm.value);
    await this.alterPw(this.profileForm.value);
  }

  canGoBack() {
    this.nav.back();
  }
}
