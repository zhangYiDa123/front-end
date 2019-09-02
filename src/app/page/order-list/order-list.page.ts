import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpServeService } from '../../http/http-serve.service';
import { LoadingController, AlertController  } from '@ionic/angular';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.page.html',
  styleUrls: ['./order-list.page.scss'],
})
export class OrderListPage implements OnInit {

  constructor(
    public activeRoute: ActivatedRoute,
    public router: Router,
    public http: HttpServeService,
    public loadingController: LoadingController,
    public alertController: AlertController,
    ) {}
  parentVal = '商城订单';
  isBuy = true;
  buyList: any = [];
  exchangeList: any = [];
  ngOnInit() {}


  changeType(type: any) {
    type === 1
    ? this.isBuy = true
    : this.isBuy = false;

    if (this.isBuy) { // 进来是买单
      this.getBuyList({pageNum: 1, pageSize: 100, type: 1});
    } else { // 进来是兑换订单
      this.getBuyList({pageNum: 1, pageSize: 100, type: 2});
    }
  }

  // 请求过程的加载框
  async presentLoading(msg: any, spin: any) {
    const loading = await this.loadingController.create({
      message: msg,
      translucent: true,
      spinner: spin,
      duration: 2000
    });
    await loading.present();
  }

  // 二次确认
  async presentAlertConfirm(id: any) {
    const alert = await this.alertController.create({
      header: '确定',
      message: '是否取消订单',
      buttons: [
        {
          text: '容朕想想',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: '确定取消',
          handler: () => {
            this.cancelFn(id);
          }
        }
      ]
    });

    await alert.present();
  }

  // 取消订单
  cancelOrder(id: any) {
    this.presentAlertConfirm(id);
  }


  // 调用取消接口
  cancelFn(id: any) {
    this.http.post('/api/v1/order/token/p-order/cancel', {orderno: id}).subscribe((info: any) => {
        if (info.status === 200) {
          this.presentLoading('订单取消成功', null);
          setTimeout(() => {
            this.getBuyList({pageNum: 1, pageSize: 100, type: 1});
          }, 2000);
        }
    });
  }

  // 前往支付页面
  toPay(price: any, orderno: any) {
    // 前往支付页面支付
    this.router.navigate(['/pay-page'], {
      queryParams: {
        price,
        orderno,
      }
    });
  }

  // 获取商品买单列表
  getBuyList(params: any) {
    this.http.post('/api/v1/order/token/p-order/list', params).subscribe((info: any) => {
      if (info.status === 200) {
        if (params.type === 1) {
          this.buyList = info.data ? info.data.list : [];
        } else {
          this.exchangeList = info.data ? info.data.list : [];
        }
      }
    });
  }

  // ionic生命周期
  ionViewDidEnter() {
    this.activeRoute.queryParams.subscribe((params: Params) => {
      this.isBuy = params.params * 1 === 1;
    });
    if (this.isBuy) { // 进来是买单
      this.getBuyList({pageNum: 1, pageSize: 100, type: 1});
    } else { // 进来是兑换订单
      this.getBuyList({pageNum: 1, pageSize: 100, type: 2});
    }
  }
}
