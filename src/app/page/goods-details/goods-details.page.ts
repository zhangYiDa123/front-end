import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpServeService } from '../../http/http-serve.service';
import { StateMange } from '../../http/stateMange';

@Component({
  selector: 'app-goods-details',
  templateUrl: './goods-details.page.html',
  styleUrls: ['./goods-details.page.scss'],
})
export class GoodsDetailsPage implements OnInit {

  constructor(
    public nav: NavController,
    public activeRoute: ActivatedRoute,
    public router: Router,
    public http: HttpServeService) {}

  parentVal = '商品详情';

  type = null;

  id: any = null;

  detail: any = {};

  // 获取商品详情
  getDetails(param: any) {
    this.http.post('/api/v1/product/detail', param).subscribe((info: any) => {
      if (info.status === 200) {
        this.detail = info.data ? info.data : {};
      }
    });
  }

  ngOnInit() {
    this.activeRoute.queryParams.subscribe((params: Params) => {
      this.type = params.params;
      this.id = params.id;
    });
    this.getDetails({productId: this.id});
  }


  // 立即购买 判断是否登录 未登录则直接跳转到登录页面
  buyNow(id: any, type: any) {
    if (StateMange.getLoginState()) {
      this.router.navigate(['/order'], {
        queryParams: {
          params: type,
          id,
        }
      });
    } else {
      this.router.navigate(['/login']);
    }
  }

  // ionic 生命周期
  ionViewDidEnter() {  }
}
