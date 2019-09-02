import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { HttpServeService } from '../../http/http-serve.service';
import { StateMange } from '../../http/stateMange';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-order-list',
  templateUrl: './my-order-list.page.html',
  styleUrls: ['./my-order-list.page.scss'],
})
export class MyOrderListPage implements OnInit {
  parentVal = '我的订单';
  isSell = true;
  sellList: any = [];
  buyList: any = [];
  constructor(
    public alertController: AlertController,
    public nav: NavController,
    public http: HttpServeService,
    public router: Router,
    public loadingController: LoadingController) {}

  ngOnInit() {
    this.getOrderList({buySellType: 1});
  }

  // 切换出让和购入
  trade(type: any) {
    if (type === 1) {
      this.isSell = true;
      this.getOrderList({buySellType: 1});
    } else {
      this.isSell = false;
      this.getOrderList({buySellType: 2});
    }
  }

  checkDetails(id: any , type: any) {
    type === 1
    ? this.router.navigate(['/sell-details'], {
        queryParams: {params: id}
      })
    : this.router.navigate(['/order-details'], {
      queryParams: {params: id}
    });
  }

  // 询问框
  async alreadyPay(id: any) {
    const alert = await this.alertController.create({
      header: '提示',
      message: '确认取消您的订单？',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('取消');
          }
        }, {
          text: '确认',
          handler: () => {
            this.http.post('/api/v1/jade/token/jade/sell/cancel', {orderno: id}).subscribe((info: any) => {
              if (info.status === 200) {
                this.tipsFn('订单已取消');
                this.getOrderList({buySellType: 1});
              }
            });
          }
        }
      ]
    });
    await alert.present();
  }

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

  // 取消出让玉佩
  cancenl(id: any) {
    this.alreadyPay(id);
  }

  // 获取时间差的函数
  timeDiffFn(startTime: any, endTime: any ) {
    return StateMange.getTimeDiff(startTime, endTime, 1);
  }

  // 获取用户订单列表
  getOrderList(params: any) {
    this.http.post('/api/v1/order/token/order-list/get', params).subscribe((info: any) => {
      if (params.buySellType === 1) { // 出让订单
        this.sellList = info.data
        ? info.data.list
        : [];
      } else if (params.buySellType === 2) { // 购入订单
        this.buyList = info.data
        ? info.data.list
        : [];
      }
    });
  }
}
