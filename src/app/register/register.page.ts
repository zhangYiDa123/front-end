import { Component, OnInit } from '@angular/core';
import {LoadingController,  NavController } from '@ionic/angular';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpServeService } from '../http/http-serve.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  constructor(public loadingController: LoadingController, public nav: NavController, public http: HttpServeService) {}

  profileForm = new FormGroup({
    mobile: new FormControl(''),
    verifyCode: new FormControl(''),
    password: new FormControl(''),
    rePassword: new FormControl(''),
    inviteCode: new FormControl(''),
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

  bfscrolltop: any;

  ngOnInit() {
    this.bfscrolltop = document.body.scrollTop;
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

  // 注册接口
  async register() {
    await this.http.post('/api/v1/user/register', this.profileForm.value).subscribe((info: any) => {
      if (info.status === 200) {
        this.loadingFN('注册成功，请登录', 2000, null);
        this.nav.navigateForward('login');
      }
    });
  }

  // 发送验证码接口
  async sentCodeFn() {
    await this.http.post('/api/v1/user/mobile/sms', {mobile: this.profileForm.value.mobile}).subscribe((info: any) => {
      if (info.status === 200) {
        this.loadingFN('短信发送成功', 2000, null);
      }
    });
  }

  canGoBack() {
    this.nav.back();
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
}
