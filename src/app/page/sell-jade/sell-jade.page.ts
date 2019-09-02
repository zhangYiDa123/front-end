import { Component, OnInit } from '@angular/core';
import { ToastController, NavController, AlertController } from '@ionic/angular';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { HttpServeService } from '../../http/http-serve.service';
@Component({
  selector: 'app-sell-jade',
  templateUrl: './sell-jade.page.html',
  styleUrls: ['./sell-jade.page.scss'],
})
export class SellJadePage implements OnInit {
  parentVal = '出售玉佩';
  needUserInfo: any = {
    jade: 0,
    freezeJade: 0,
  };
  min: any = 0;
  jadePrice: any = 1.00;
  free: any = 0;
  sellNumber: any = '';
  constructor(
    public alertController: AlertController,
    public toastController: ToastController,
    public nav: NavController,
    private keyboard: Keyboard,
    public http: HttpServeService) {}

  ngOnInit() {
    this.getJadeSell();
  }


  // 提示信息
  async toastFn(msg: any) {
    const toast = await this.toastController.create({
      message: msg,
      color: 'primary',
      position: 'top',
      duration: 2000
    });
    toast.present();
  }

  // 获取玉佩最新价
  getJadePrice() {
   this.http.post('/api/v1/jade/jade-price/get').subscribe((info: any) => {
    if (info.status === 200) {
      this.jadePrice = info.data.list.length > 0
      ? info.data.list[0].jadePrice
      : 0;
    }
   });
  }

  // 获取出售玉佩信息
  getJadeSell() {
    this.http.post('/api/v1/jade/token/jade-trade/data').subscribe((info: any) => {
      console.log(info);
      if (info.status === 200) {
        [this.min, this.free]
        =
        [info.data.jadeSellMinNum, info.data.jadeFee];
      }
    });
  }

  // 提示消息
  async presentAlert(msg: any, text1: any, text2: any, type: any) {
    const alert = await this.alertController.create({
      header: '提示',
      message: msg,
      buttons: [
        {
          text: text2,
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('取消');
          }
        }, {
          text: text1,
          handler: () => {
            if (type === 1) {
              this.nav.navigateForward('/real-name');
            } else if (type === 2) {
              this.nav.navigateForward('/set-password');
            }
          }
        }
      ]
    });

    await alert.present();
  }


  // 出让玉佩
  sellJadeFn(param: any) {
    this.http.post('/api/v1/jade/token/jade/sell', param).subscribe((info: any) => {
      if (info.status === 200) {
        this.toastFn('玉佩出让成功');
        setTimeout(() => {
          this.nav.navigateForward('my-order-list');
        }, 1000);
      } else if (info.status === 500 && info.data.errcode === 20003) {
        setTimeout(() => {
          this.presentAlert('您还未设置资金密码', '去设置', '取消', 2);
        }, 800);
      } else if (info.status === 500 && info.data.errcode === 20004) {
        setTimeout(() => {
          this.presentAlert('您还未进行实名认证', '去实名', '取消', 1);
        }, 800);
      }
    });
  }

   submit() {
    // 判断是否满足条件
    if (this.sellNumber * 1 < this.min * 1) {
      this.toastFn('出让玉佩数不能小于最小出让数');
      return false;
    }

    if (this.sellNumber * 1 > this.needUserInfo.jade * 1) {
      this.toastFn('出让玉佩数不能大于可用玉佩数');
      return false;
    }

    this.getKey();
  }

  // 生成令牌sessionkey
  getKey() {
    this.http.post('/api/v1/global/token/form/sessionkey').subscribe((info: any) => {
      if (info.status === 200) {
        this.sellJadeFn({jade: this.sellNumber, sessionkey: info.data.sessionkey});
      }
    });
  }

  // 获取焦点 和失去焦点
  Input(num) {
    num === 1
    ? this.keyboard.hide()
    : this.keyboard.show();
  }

  // 调用用户信息接口
  getUserInfo() {
    this.http.post('/api/v1/user/token/user-info/get').subscribe((info: any) => {
      if (info.status === 200) {
        console.log(info.data);
        [this.needUserInfo.jade, this.needUserInfo.freezeJade]
        =
        [info.data.jade, info.data.freezeJade];
      }
    });
  }

  // 获取玉佩当前价格

  // ionic 的生命周期
  ionViewDidEnter() {
    this.getUserInfo();
    this.getJadePrice();
  }
}
