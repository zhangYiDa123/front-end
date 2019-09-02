import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpServeService } from '../../http/http-serve.service';
import { StateMange } from '../../http/stateMange';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.page.html',
  styleUrls: ['./order-details.page.scss'],
})
export class OrderDetailsPage implements OnInit {
  parentVal = '订单详情';

  popupState = false;

  result = 1;

  orderno: any = '';

  jadeInfo: any = {};

  time: any = '';

  constructor(
    public alertController: AlertController,
    public router: Router,
    public activeRoute: ActivatedRoute,
    public http: HttpServeService,
    public loadingController: LoadingController) {}

  ngOnInit() {}

  // 提示框
  async tipsFn() {
    const loading = await this.loadingController.create({
      message: '取消成功' ,
      translucent: true,
      duration: 2000,
      spinner: null,
    });
    await loading.present();
  }

  async comfirmFn() {
    const alert = await this.alertController.create({
      header: '提示',
      message: '请您在30分钟以内完成支付,超过时间订单将会被系统自动取消',
      buttons: [
        {
          text: '知道了',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('取消');
          }
        }
      ]
    });

    await alert.present();
  }

  async alreadyPay() {
    const alert = await this.alertController.create({
      header: '提示',
      message: '<p>请确认以打款至对方支付宝，</p><p>若恶意支付将冻结账户！</p>',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('取消');
          }
        }, {
          text: '确认支付',
          handler: () => {
            console.log('确认支付');
            this.popupState = true;
          }
        }
      ]
    });

    await alert.present();
  }

  receiveVal(data: any) {
    this.popupState = data.show;
    if (data.type === 1) { // 1 代表执行完成重新获取订单详情
      this.getOrderDel({orderno: this.orderno});
    }
  }

  // 获取订单详情
  getOrderDel(param: any) {
    this.http.post('/api/v1/order/token/order-detail/get', param).subscribe((info: any) => {
      if (info.status === 200) {
        this.result = info.data.status;
        [this.jadeInfo.num, this.jadeInfo.totalPrice,
          this.jadeInfo.sellerRealname, this.jadeInfo.sellerMobile, this.jadeInfo.sellerAlipayAccount]
        =
        [info.data.num, info.data.totalPrice, info.data.sellerRealname,
          info.data.sellerMobile, info.data.sellerAlipayAccount];
        if (info.data.status === 2) { // 待支付
          StateMange.countDown(info.data.leftSeconds, this, 'time');
          setTimeout( () => {
            this.comfirmFn();
          }, 1500);
        }
      }
    });
  }

  // ionic 生命周期
  ionViewDidEnter() {
    this.activeRoute.queryParams.subscribe((params: Params) => {
      this.orderno = params.params;
      this.getOrderDel({orderno: this.orderno});
    });
  }
}
