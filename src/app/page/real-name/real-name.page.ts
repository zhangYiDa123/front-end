import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import { HttpServeService } from '../../http/http-serve.service';

@Component({
  selector: 'app-real-name',
  templateUrl: './real-name.page.html',
  styleUrls: ['./real-name.page.scss'],
})
export class RealNamePage implements OnInit {

  constructor(public nav: NavController, public http: HttpServeService, public loadingController: LoadingController) {}

  parentVal = '实名认证';

  realForm: any = {
    realname: '',
    idCard: '',
    alipayAccount: '',
  };

  ngOnInit() {}

  // 提示信息
  async presentLoading(msg: any) {
    const loading = await this.loadingController.create({
      message: msg ,
      translucent: true,
      spinner: null,
      duration: 2000,
    });
    await loading.present();
  }

  // 获取实名认证的结果
  getRealName() {
    this.http.post('/api/v1/user/token/auth-info/get').subscribe((info: any) => {
      if (info.status === 200 ) {
        if (info.data ? info.data.authFlagStr && !info.data.isPay : false) { // 这里有疑问 反馈后修改
          this.nav.navigateForward('real-name-result');
        }
      }
    });
  }

  // 调用实名认证接口
  getReal(param: any) {
    this.http.post('/api/v1/user/token/auth-info/set', param).subscribe((info: any) => {
      if (info.status === 200) {
        this.nav.navigateForward('real-name-result');
      }
    });
  }

  // 提交实名认证
  pay() {
    if (this.realForm.realname === '' || this.realForm.realname === null || this.realForm.realname === undefined) {
      this.presentLoading('请填写用户姓名');
      return false;
    }

    if (this.realForm.idCard === '' || this.realForm.idCard === null || this.realForm.idCard === undefined) {
      this.presentLoading('请填写身份证信息');
      return false;
    }

    if (this.realForm.alipayAccount === '' || this.realForm.alipayAccount === null || this.realForm.alipayAccount === undefined) {
      this.presentLoading('请填写支付宝账号');
      return false;
    }
    this.getReal(this.realForm);
  }

  // ionic的生命周期
  ionViewDidEnter() {
    this.getRealName();
  }
}
