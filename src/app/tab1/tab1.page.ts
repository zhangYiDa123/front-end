import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HttpServeService } from '../http/http-serve.service';
import { StateMange } from '../http/stateMange';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  constructor(
    public nav: NavController,
    public http: HttpServeService,
    ) {}

  userInfo = {userName: '游客', wekJin: 0, calculate: 0};
  treeList = [];
  devciesWidth = null;
  loginState = false;
  singleJade: any = 0.100;
  sign: string = null;
  // 收取玉佩后玉佩数量对应增加
  receiveVal(data: any) {
    setTimeout( () => {
      this.userInfo.wekJin += data * 1;
    }, 750);
  }
  // 获取0-3之间的随机数
  getRandom() {
    return Math.random() * 3 + 's';
  }

  // 玉佩初始化
  // 封装的函数思路
  // step1: 生成一个在指定区域内随机的div
  // step2：判断div和是否合法(是否超边距，或者两个div相交)
  // step3：如果不合法重新执行第一步和第二步
  // step4：如果合法则完成一个div
  // step5：重复step1~4，直到生成制定个数的div
  init(myWidth, R, H, Num) {
    for (let i = 0; i < 500; i++) {
      if (this.treeList.length >= Num) {
        break;
      } else {
        this.step1(myWidth, R, H);
      }
    }
  }

  step1(myWidth, R, H) {
    const maxPositionX = myWidth.targetWidth - R;
    const maxPositionY = myWidth.targetHeight - H;
    // 随机数的生成 0 - 最大X位置和Y位置的随即数
    const randomX = Math.random() * maxPositionX;
    const randomY = Math.random() * maxPositionY;
    if (this.treeList.length === 0) {
      this.treeList.push({x : `${randomX}`, y: `${randomY}`, s: `${this.getRandom()}` });
    } else if (this.step2(this.treeList, randomX, randomY, R, H)) {
      this.treeList.push({x : `${randomX}`, y: `${randomY}`, s: `${this.getRandom()}` });
    }
  }

  step2(data, randomX, randomY, R, H) {
    // 筛选出和新生成的div x最近的一个坐标
    const kongX = [];
    data.forEach( (item, index, array) => {
      kongX.push({value: Math.abs(item.x - randomX), x: item.x});
    });
    kongX.sort((a, b) => {
      return a.value - b.value;
    });
    const rultFnX = (item, index, array) => {
      return item.x === kongX[0].x;
    };
    const nearestX = data.filter(rultFnX);
    let state = false;
    const resultNow = () => {
      if (Math.abs(nearestX[0].x - randomX) < R + 10 &&
      Math.abs(nearestX[0].y - randomY) < H + 10 ) {
        state = false;
      } else {
        state = true;
      }
    };
    resultNow();
    return state;
  }

  // ionic 生命周期 进入页面后触发
  ionViewDidEnter() {
    this.loginState = StateMange.getLoginState();
    if (StateMange.getLoginState()) { // 是否登录
      this.getJadeData();
      // 获取用户信息
      this.getUserInfo();
    } else {
      this.singleJade = 0.10;
      setTimeout(() => {
        const getTargetWidth = () => {
          const targetWidth = document.getElementById('tree').clientWidth;
          const targetHeight = document.getElementById('tree').clientHeight;
          if (!(targetWidth > 0)) {
            getTargetWidth();
          } else {
            return {targetWidth, targetHeight};
          }
        };
        this.devciesWidth = getTargetWidth().targetWidth;
        const myWidth = getTargetWidth();
        const R = 50; // 玉佩的半径
        const H = 60; // 装玉佩的盒子的高度
        this.init(myWidth, R, H, 10);
      }, 300);
    }
  }

  // 跳转到对应页面
  jump(path: any) {
    this.nav.navigateForward(path);
  }

  // 获取用户信息
  getUserInfo() {
    this.http.post('/api/v1/user/token/user-info/get').subscribe((info: any) => {
      if (info.status === 200) {
        window.localStorage.setItem('gx_userInfo', JSON.stringify(info.data));
        [this.userInfo.userName,
          this.userInfo.wekJin,
          this.userInfo.calculate]
          = [info.data.nickname,
            info.data.jade,
            info.data.wisdom];
      }
    });
  }

  // 获取玉佩详情
  getJadeData() {
    this.http.post('/api/v1/jade/token/detail/get').subscribe((info: any) => {
      if (info.status === 200) {
        this.sign = info.data.sign;
        this.singleJade = info.data.singleJade
      ? (info.data.singleJade * 1).toFixed(6)
      : null;
        setTimeout(() => {
          const getTargetWidth = () => {
            const targetWidth = document.getElementById('tree').clientWidth;
            const targetHeight = document.getElementById('tree').clientHeight;
            if (!(targetWidth > 0)) {
              getTargetWidth();
            } else {
              return {targetWidth, targetHeight};
            }
          };
          this.devciesWidth = getTargetWidth().targetWidth;
          const myWidth = getTargetWidth();
          const R = 45; // 玉佩的半径
          const H = 60; // 装玉佩的盒子的高度
          if (this.singleJade && this.singleJade * 1 > 0) {
            this.init(myWidth, R, H, info.data.jadeNum);
          }
        }, 300);
      }
    });
  }

}
