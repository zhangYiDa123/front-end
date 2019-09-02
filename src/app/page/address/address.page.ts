import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { HttpServeService } from '../../http/http-serve.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-address',
  templateUrl: './address.page.html',
  styleUrls: ['./address.page.scss'],
})
export class AddressPage implements OnInit {

  constructor(
    public activeRoute: ActivatedRoute,
    public router: Router,
    public nav: NavController,
    private keyboard: Keyboard,
    public http: HttpServeService,
    public loadingController: LoadingController) {}

  parentVal = '输入收件地址';
  type: any = '';
  id: any = '';

  params: any = {
    addressee: '',
    mobile: '',
    address: '',
  };

  ngOnInit() {
    this.activeRoute.queryParams.subscribe((params: Params) => {
      this.type = params.params;
      this.id = params.id;
    });
  }

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

  saveAddress() {
    let i = 0;
    Object.keys(this.params).forEach((key: any) => {
      if (this.params[key] === '' || this.params[key] === null || this.params[key] === undefined) {
        i++;
        this.presentLoading('请先完善信息');
      }
    });
    if (i > 0) {
      return false;
    }
    this.saveAddressFn(this.params);
  }

  // 保存新地址
  saveAddressFn(parms: any) {
    this.http.post('/api/v1/address/token/add', parms).subscribe((info: any) => {
      if (info.status === 200) {
        this.router.navigate(['/order'], {
          queryParams: {
            params: this.type,
            id: this.id,
          }
        });
      }
    });
  }

  // 获取焦点 和失去焦点
  Input(num) {
    num === 1
    ? this.keyboard.hide()
    : this.keyboard.show();
  }

}
