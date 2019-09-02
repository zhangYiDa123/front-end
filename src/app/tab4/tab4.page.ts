import { Component, ViewChild } from '@angular/core';
import { NavController, IonInfiniteScroll } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpServeService } from '../http/http-serve.service';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page {
  constructor(public nav: NavController, public router: Router, public http: HttpServeService) {}
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  checkActive = true;
  slideOptions = {
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    speed: 400,
  };

  buyParams: any = {
    pageNum: 1,
    pageSize: 10,
    type: 1,
  };

  buyTotal: any = 0;

  buyList: any = [];

  exchangeList: any = [];

  exchangeParams: any = {
    pageNum: 1,
    pageSize: 10,
    type: 2,
  };

  exchangeTotal: any = 0;

  tipText: any = '正在加载更多数据';

  i: any = 0;

  buyDataState: any = false;

  exchangeDataState: any = false;

  // 去商品详情页面
  toDetails(id: any, type: any) {
    this.router.navigate(['/goods-details'], {
      queryParams: {
        params: type,
        id,
      }
    });
  }

  // 切换类型 true买入 false兑换
  checkBuy(type: any) {
    this.checkActive = type;
    if (!this.checkActive) {
      this.i ++;
      if (this.i === 1) {
        this.getProductList(this.exchangeParams, 1);
      }
    }
  }

  // 刷新功能
  doRefresh(event: any) {
    setTimeout(() => {
      this.buyParams.pageNum = 1;
      this.exchangeParams.pageNum = 1;
      this.checkActive
      ? this.getProductList(this.buyParams, 1)
      : this.getProductList(this.exchangeParams, 1);
      this.buyDataState = false;
      this.exchangeDataState = false;
      event.target.complete();
    }, 2000);
  }

  // 获取商品列表 type是刷新还是加载更多 1刷新 2加载更多
  getProductList(param: any, type: any) {
    this.http.post('/api/v1/product/list', param).subscribe((info: any) => {
      if (info.status === 200) {
        if (type === 1) {
          param.type === 1
          ? this.buyList = info.data ? info.data.list : []
          : this.exchangeList = info.data ? info.data.list : [];
        } else if (type === 2) {
          param.type === 1
          ? this.buyList = info.data && info.data.list ? this.buyList.concat(info.data.list) : this.buyList.concat([])
          : this.exchangeList = info.data && info.data.list ? this.exchangeList.concat(info.data.list) : this.exchangeList.concat([]);
        }

        param.type === 1
        ? this.buyTotal = info.data ? info.data.total : 0
        : this.exchangeTotal = info.data ? info.data.total : 0;
      }
    });
  }

  // 滚动加载更多
  loadData(event: any) {
    setTimeout(() => {
      event.target.complete();
      this.tipText = '正在加载更多数据';
      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      // event.target.disabled = true;
      if (this.checkActive) { // 买入 判断滚动的是买入还是兑换 true买入 false兑换
        event.target.disabled = this.buyDataState;
        if (this.buyList.length < this.buyTotal) { // 还有数据可以加载
          this.buyParams.pageNum ++;
          this.getProductList(this.buyParams, 2);
        } else { // 没有更多数据了
          this.tipText = '没有更多数据了';
          this.buyDataState = true;
        }
      } else { // 兑换
        event.target.disabled = this.exchangeDataState;
        if (this.exchangeList.length < this.exchangeTotal) { // 还有数据可以加载
          this.exchangeParams.pageNum ++;
          this.getProductList(this.exchangeParams, 2);
        } else { // 没有更多数据了
          this.tipText = '没有更多数据了';
          this.exchangeDataState = true;
        }
      }
    }, 1000);
  }

  // ionic 生命周期进入页面触发  ionViewDidEnter
  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {
    this.getProductList(this.buyParams, 1);
  }

}
