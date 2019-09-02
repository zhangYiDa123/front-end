import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, IonInfiniteScroll } from '@ionic/angular';
import { StateMange } from '../../http/stateMange';
import { HttpServeService } from '../../http/http-serve.service';
@Component({
  selector: 'app-my-jade',
  templateUrl: './my-jade.page.html',
  styleUrls: ['./my-jade.page.scss'],
})
export class MyJadePage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  constructor(public nav: NavController, public http: HttpServeService) {}

  parentVal = '我的佩玉';

  jade: any = 0;

  getJadeList: any = [];

  total: any = 0;

  ngOnInit() {}

  sellNow() {
    this.nav.navigateForward('sell-jade');
  }

  // 获取玉佩变动列表
  getJadeListFn(param: any) {
    this.http.post('/api/v1/jade/token/jade/record/list', param).subscribe((info: any) => {
      if (info.status === 200) {
        this.total = info.data ? info.data.total : 0;
        this.getJadeList = info.data && info.data.list ? this.getJadeList.concat(info.data.list) : this.getJadeList.concat([]);
      }
    });
  }

  // 滚动加载更多
  loadData(event: any) {
    setTimeout(() => {
      event.target.complete();
      if (this.getJadeList.length && !event.target.disabled) {
        this.getJadeListFn({startTime: this.getJadeList[this.getJadeList.length - 1].createTime});
      } else {
        event.target.disabled = true;
      }
    }, 1000);
  }

  // ionic的生命周期
  ionViewDidEnter() {
    this.jade = StateMange.getUserInfo().jade;
    this.getJadeListFn({startTime: ''});
  }
}
