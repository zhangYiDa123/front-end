import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { LoadingController} from '@ionic/angular';
import { HttpServeService } from '../../app/http/http-serve.service';
@Component({
  selector: 'app-pay-popup',
  templateUrl: './pay-popup.component.html',
  styleUrls: ['./pay-popup.component.scss'],
})
export class PayPopupComponent implements OnInit {
  @Output() fromChild = new EventEmitter();
  constructor(public loadingController: LoadingController, public http: HttpServeService) {}

  a = null;
  b = null;
  c = null;
  d = null;
  e = null;
  f = null;

  @Input () orderno: any;
  @Input() type: any; // 1为购买订单的时候确认订单
  ngOnInit() {}


  // 提示框
  async tipsFn(msg: any) {
    const loading = await this.loadingController.create({
      message: msg,
      translucent: true,
      duration: 2000,
      spinner: null,
    });
    await loading.present();
  }

  // 调用确认已付款接口
  pay(parms: any) {
     this.http.post('/api/v1/order/token/order/pay', parms).subscribe((info: any) => {
      if (info.status === 200) {
        this.tipsFn('订单确认成功,等待对方放行');
        setTimeout(() => {
          this.fromChild.emit({
            show: false,
            type: 1
          });
        }, 1000);
      }
    });
  }

  // 调用确认放行接口
  passOrder(param: any) {
    this.http.post('/api/v1/order/token/order/pass', param).subscribe((info: any) => {
      if (info.status === 200) {
        this.tipsFn('放行成功，交易完成');
        setTimeout(() => {
          this.fromChild.emit({
            show: false,
            type: 1
          });
        }, 1000);

        // 执行是否留在原页面还是跳转走
      }
    });
  }

  async inputNum(e: any) {
    const str =  [this.a, this.b, this.c, this.d, this.e, this.f].filter(item => item);
    const strLength = str.length;
    if (e === 'delete') {
      if (strLength === 0) {
        return false;
      }
      str.splice(str.length - 1, 1);
    } else {
      if (strLength >= 6) {
        return false;
      } else {
        str.push(e);
      }
    }
    [this.a, this.b, this.c, this.d, this.e, this.f] = str;
    if ( str.length >= 6 ) {
      // this.tipsFn('提交中，请勿重复操作');
      if (this.type * 1 === 1) {
        this.pay({orderno: this.orderno, paypsw: str.join('')});
      } else if (this.type * 1 === 2) {
        this.passOrder({orderno: this.orderno, paypsw: str.join('')});
      }
    }
  }
}
