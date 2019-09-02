import { Component, OnInit } from '@angular/core';
import { HttpServeService } from '../../http/http-serve.service';
import { StateMange } from '../../http/stateMange';
@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.page.html',
  styleUrls: ['./ranking.page.scss'],
})
export class RankingPage implements OnInit {

  constructor(public http: HttpServeService) { }
  parentVal = '学识排行榜';
  topRank = [];
  rankList = [];
  First: any = '';
  Second: any = '';
  Third: any = '';
  loginState: any = false;
  ngOnInit() {
    if (StateMange.getLoginState()) {
      this.loginState = true;
      this.rankFn();
    } else {
      this.loginState = false;
    }
  }


  // 调用排行接口
  async rankFn() {
    await this.http.post('/api/v1/wisdom/token/list/get', {pageSize: 50, pageNum: 1}).subscribe((info: any) => {
      if (info.status === 200) {
        this.topRank = info.data.list.filter((key: any, i: any) => i < 3);
        this.rankList = info.data.list.filter((key: any, i: any) => i > 2);
        [this.First, this.Second, this.Third] = [this.topRank[0], this.topRank[1], this.topRank[2]];
      }
    });
  }
  // ionic 生命周期 进入页面触发
  ionViewDidEnter() {
    // this.rankFn();
  }

}
