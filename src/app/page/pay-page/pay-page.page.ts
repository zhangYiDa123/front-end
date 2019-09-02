import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpServeService } from '../../http/http-serve.service';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-pay-page',
  templateUrl: './pay-page.page.html',
  styleUrls: ['./pay-page.page.scss'],
})
export class PayPagePage implements OnInit {

  constructor(
    public http: HttpServeService,
    public activeRoute: ActivatedRoute,
    public router: Router,
    public alertController: AlertController
  ) { }
  parentVal: any = '支付';
  price: any = 0;
  qrCode: any = '';
  orderno: any = null;
  ngOnInit() {}

  // 获取支付二维码
  getqrCode(param: any) {
    this.http.post('/api/v1/order/token/p-order/qrcode', param).subscribe((info: any) => {
      if (info.status === 200) {
        this.qrCode = info.data.img;
      }
    });
  }

  // 提示消息
  async presentAlert(msg: any, text1: any, text2: any) {
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
            this.router.navigate(['/order-list'], {
              queryParams: {
                params: 1
              }
            });
          }
        }
      ]
    });

    await alert.present();
  }

  // 确定支付
  isOk() {
    this.presentAlert('您是否已经扫码支付，如未支付请先扫码支付，支付完成后点击点击‘已支付’按钮？', '已支付', '未支付');
  }

  ionViewDidEnter() {
    this.activeRoute.queryParams.subscribe((params: Params) => {
      this.price = params.price;
      this.orderno = params.orderno;
    });

    if (this.orderno) {
      this.getqrCode({orderno: this.orderno});
    }

  }
}
