import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpServeService } from '../../http/http-serve.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-sell-details',
  templateUrl: './sell-details.page.html',
  styleUrls: ['./sell-details.page.scss'],
})
export class SellDetailsPage implements OnInit {

  constructor(
    public alertController: AlertController,
    public router: Router,
    public activeRoute: ActivatedRoute,
    public http: HttpServeService) { }

  parentVal = '订单详情';
  status: any = 1;
  orderno: any = '';
  jadeInfo: any = {};
  popupState = false;
  ngOnInit() {}

  // 获取订单详情
  getOrderDel(param: any) {
    this.http.post('/api/v1/order/token/order-detail/get', param).subscribe((info: any) => {
      if (info.status === 200) {
        [this.jadeInfo.num,
        this.jadeInfo.totalPrice,
        this.jadeInfo.buyerRealname,
        this.jadeInfo.buyerMobile,
        this.jadeInfo.buyerAlipayAccount]
        =
        [info.data.num,
        info.data.totalPrice,
        info.data.buyerRealname,
        info.data.buyerMobile,
        info.data.buyerAlipayAccount];

        this.status = info.data.status;
      }
    });
  }

  // 显示支付键盘
  receiveVal(data: any) {
    this.popupState = data.show;
    if (data.type === 1) { // 1 代表执行完成重新获取订单详情
      this.getOrderDel({orderno: this.orderno});
    }
  }

  // 询问框
  async alreadyPay() {
    const alert = await this.alertController.create({
      header: '提示',
      message: '<p>请确认已收到对方转账再确认，</p><p>确保您订单正常交易！</p>',
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
            this.popupState = true;
          }
        }
      ]
    });

    await alert.present();
  }

  // 确认放行
  payOver() {
    this.alreadyPay();
  }

  ionViewDidEnter() {
    this.activeRoute.queryParams.subscribe((params: Params) => {
      this.orderno = params.params;
      this.getOrderDel({orderno: this.orderno});
    });
  }

}
