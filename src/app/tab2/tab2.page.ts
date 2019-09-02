import { Component } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { HttpServeService } from '../http/http-serve.service';
import { StateMange } from '../http/stateMange';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  constructor(public nav: NavController, public http: HttpServeService, public alertController: AlertController) {}

  state = true;

  show = false;

  setState = false;

  parentVal = '您还未设置支付密码';

  text: any = '';

  sellOrderList: any = [];

  orderHistoryList: any = [];

  orderInfo: any = {
    orderno: '',
    actualNum: '',
    jadePrice: '',
    actualPrice: '',
  };

  change(type) {
    if (type === 1) {
      this.state = true;
      this.getOrderList();
    } else {
      this.state = false;
      this.getHistoryOrder();
    }
  }

  receiveVal(e) {
    e === 1
    ? this.show = false
    : this.show = false;
  }


  // 跳转到交易规则页面
  rules() {
    this.nav.navigateForward('/rules');
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

  bugNow(orderno: any, actualNum: any, jadePrice: any, actualPrice: any) {
    const userInfo = StateMange.getUserInfo();

    if (!StateMange.getLoginState()) {
      this.nav.navigateForward('/login');
      return false;
    }

    if (userInfo.authFlag === 0) { // 未进行实名认证
      this.presentAlert('您还未进行实名认证', '去实名', '取消', 1);
      return false;
    }

    if (!userInfo.payPsw) {
      this.presentAlert('您还未设置资金密码', '去设置', '取消', 2);
      return false;
    }

    [this.orderInfo.orderno, this.orderInfo.actualNum, this.orderInfo.jadePrice, this.orderInfo.actualPrice]
    =
    [orderno, actualNum, jadePrice, actualPrice];
    this.show = true;
  }

  setEvent() {
    this.setState = false;
    this.nav.navigateForward('/set-password');
  }

  orderPage() {
    this.nav.navigateForward('/my-order-list');
  }

  // 获取市场卖出订单列表
  getOrderList() {
    this.http.post('/api/v1/jade-market/wait-buy/orders').subscribe((info: any) => {
      if (info.status === 200) {
        this.sellOrderList = info.data.list
        ? info.data.list
        : [];
      }
    });
  }

  // 获取历史成交列表
  getHistoryOrder() {
    this.http.post('/api/v1/jade-market/success/orders').subscribe((info: any) => {
      if (info.status === 200) {
        this.orderHistoryList = info.data.list
        ? info.data.list
        : [];
      }
    });
  }

  // 滚动改变值的方法
  marqueeFn() {
    const name = StateMange.getAllName()[Math.floor(Math.random() * StateMange.getAllName().length - 1)];
    const number2 = (10 + Number((Math.random() * 50))).toFixed(2);
    const number3 = Math.floor(Math.random() * 1000);
    this.text = `动态：${name} ${number3 % 2 === 0 ? '购买了' : '出让了'} ${number2} 个君子玉`;
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {
    this.marqueeFn();
    setInterval(() => {
      this.marqueeFn();
    }, 22000);
  }

  // ionic 生命周期 进和入页面后触发
  ionViewDidEnter() {
    this.getOrderList();
  }

}
