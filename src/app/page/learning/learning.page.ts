import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, IonInfiniteScroll } from '@ionic/angular';
import { StateMange } from '../../http/stateMange';
import { HttpServeService } from '../../http/http-serve.service';
@Component({
  selector: 'app-learning',
  templateUrl: './learning.page.html',
  styleUrls: ['./learning.page.scss'],
})
export class LearningPage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  constructor(public nav: NavController, public http: HttpServeService) {}

  parentVal = '我的学识';

  wisdom: any = '0';

  wisdomList: any = [];

  tipText: any = '正在加载更多数据';

  param: any = {
    pageNum: 1,
    pageSize: 200,
  };

  ngOnInit() {}

  // 加速
  speedUp() {
    this.nav.navigateForward('speedup');
  }

  // 滚动加载更多
  loadData(event: any) {
    setTimeout(() => {
      event.target.complete();
      event.target.disabled = true;
    }, 2000);
  }

  // 获取学识
  getWisdom() {
    const { wisdom } = StateMange.getUserInfo();
    this.wisdom = wisdom;
  }

  // 时间戳转成正常时间格式
  timeToComplete(time: any) {
    return StateMange.timeToComplete(time);
  }

  // 过去用户学识列表
  getWisdomList(param: any) {
    this.http.post('/api/v1/wisdom/token/personal/list/get', param).subscribe((info: any) => {
      if (info.status === 200) {
        this.wisdomList = this.wisdomList.concat(info.data ? info.data.list : []);
      }
    });
  }

  // ionic的生命周期
  ionViewDidEnter() {
    this.getWisdom();
    this.getWisdomList(this.param);
  }
}
