import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpServeService } from '../../http/http-serve.service';
import { StateMange } from '../../http/stateMange';


@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {

  constructor(
    public http: HttpServeService,
    public nav: NavController,
    public activeRoute: ActivatedRoute,
    public router: Router,
    public toastController: ToastController) {}

  parentVal: any = '确认订单';
  type: any = null;
  num: any = 1;
  id: any = 0;
  detail: any = {};
  addressList: any = [];
  addressId: any = null;
  addressInfo: any = {};
  canJade: any = 0;

  ngOnInit() {}

  // 获取配送地址
  getAddress(params: any) {
    this.http.post('/api/v1/address/token/list', params).subscribe((info: any) => {
      if (info.status === 200) {
        this.addressList = info.data ? info.data.list : [];
        this.getAddInfo();
      }
    });
  }

  // 获取商品详情
  getDetails(param: any) {
    this.http.post('/api/v1/product/detail', param).subscribe((info: any) => {
      if (info.status === 200) {
        this.detail = info.data ? info.data : {};
      }
    });
  }

  addressPage() {
    this.router.navigate(['/address-list'], {
      queryParams: {
        params: this.type,
        id: this.id,
      }
    });
  }

  reduce() {
    if (this.num <= 1) {
      return false;
    } else {
      this.num--;
    }
  }

  add() {
    this.num++;
  }


  pay(type: any) {
    console.log(this.addressId);
    if (this.addressList.length <= 0) {
      this.presentToast('请添加(填写)收件地址');
      return false;
    }
    this.getKey(type);
  }

  // 玉佩兑换确认订单
  yuPay(param: any) {
    if (this.addressId === null || this.addressId === undefined || this.addressId === '') {
      this.presentToast('请选择(填写)收件地址');
      return false;
    }

    if (this.canJade <= this.detail.price * this.num) {
      this.presentToast('玉佩不足');
      return false;
    }

    this.http.post('/api/v1/order/token/pex-order/submit', param).subscribe((info: any) => {
      if (info.status === 200) {
        console.log(info);
        this.payYu({orderno: info.data.orderno});
      }
    });
  }

  // 支付玉佩订单
  payYu(param: any) {
    this.http.post('/api/v1/order/token/pex-order/pay', param).subscribe((info: any) => {
      if (info.status === 200) {
        this.presentToast('兑换成功');
        this.router.navigate(['/order-list'], {
          queryParams: {
            params: 2
          }
        });
      }
    });
  }

  async presentToast(msg: any) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      position: 'top',
      color: 'primary',
    });
    toast.present();
  }

  // 调用确认下单接口
  submitOrder(params: any) {
    if (this.addressId === null || this.addressId === undefined || this.addressId === '') {
      this.presentToast('请选择(填写)收件地址');
      return false;
    }
    this.http.post('/api/v1/order/token/p-order/submit', params).subscribe((info: any) => {
      if (info.status === 200) {
        this.presentToast('订单确认成功,请前去支付');
        // 前往支付页面支付
        this.router.navigate(['/pay-page'], {
          queryParams: {
            price: (this.detail.price * this.num).toFixed(2),
            orderno: info.data.orderno,
          }
        });
      }
    });
  }

  // 生成令牌sessionkey
  getKey(type: any) {
    this.http.post('/api/v1/global/token/form/sessionkey').subscribe((info: any) => {
      if (info.status === 200) {
        type * 1 === 1
          ? this.submitOrder({
            addressId: this.addressId,
            num: this.num,
            productId: this.id,
            sessionkey: info.data.sessionkey
          })
          : this.yuPay({
            addressId: this.addressId,
            num: this.num,
            productId: this.id,
            sessionkey: info.data.sessionkey
          });
      }
    });
  }


  // 获取用户的详情收件地址
  getAddInfo() {
    if (this.addressId) { // 有选择收件地址
      this.addressList.forEach((key: any) => {
        if (key.id * 1 === this.addressId * 1) {
          [this.addressInfo.addressee,
            this.addressInfo.address,
            this.addressInfo.mobile] =
            [
              key.addressee,
              key.address,
              key.mobile,
            ];
        }
      });
    } else { // 没有选择收件地址 选择默认
      [this.addressInfo.addressee,
        this.addressInfo.address,
        this.addressInfo.mobile,
        this.addressId] =
        [
          this.addressList[0] ? this.addressList[0].addressee : null,
          this.addressList[0] ? this.addressList[0].address : null,
          this.addressList[0] ? this.addressList[0].mobile : null,
          this.addressList[0] ? this.addressList[0].id : null
        ];
    }
  }

  ionViewDidEnter() {
    this.activeRoute.queryParams.subscribe((params: Params) => {
      this.type = params.params;
      this.id = params.id;
      this.addressId = params.addressId ? params.addressId : null;
    });
    this.getDetails({productId: this.id});
    this.getAddress({pageNum: 1, pageSize: 100});
    this.canJade = StateMange.getUserInfo().jade * 1 - StateMange.getUserInfo().receiveJade * 1;
  }

}
