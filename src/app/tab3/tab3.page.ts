import { Component } from '@angular/core';
import { ToastController, NavController, AlertController  } from '@ionic/angular';
import { HttpServeService } from '../http/http-serve.service';
import { StateMange } from '../http/stateMange';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  constructor(public toastController: ToastController,
              public http: HttpServeService,
              public nav: NavController,
              public alertController: AlertController) {}
  userData = [
    {
      img1: 'assets/images/m17.png',
      img2: 'assets/images/m19.png',
      img3: 'assets/images/m20.png',
      name: '孔子',
    },
    {
      img1: 'assets/images/17-2.jpg',
      img2: 'assets/images/19-2.jpg',
      img3: 'assets/images/20-2.jpg',
      name: '老子',
    },
    {
      img1: 'assets/images/17-3.jpg',
      img2: 'assets/images/19-3.jpg',
      img3: 'assets/images/20-3.jpg',
      name: '墨子',
    },
    {
      img1: 'assets/images/17-4.jpg',
      img2: 'assets/images/19-4.jpg',
      img3: 'assets/images/20-4.jpg',
      name: '韩非子',
    },
    {
      img1: 'assets/images/17-5.jpg',
      img2: 'assets/images/19-5.jpg',
      img3: 'assets/images/20-5.jpg',
      name: '公孙龙',
    },
    {
      img1: 'assets/images/17-6.jpg',
      img2: 'assets/images/19-6.jpg',
      img3: 'assets/images/20-6.jpg',
      name: '苏秦',
    },
    {
      img1: 'assets/images/17-7.jpg',
      img2: 'assets/images/19-7.jpg',
      img3: 'assets/images/20-7.jpg',
      name: '邹衍',
    },
    {
      img1: 'assets/images/17-8.jpg',
      img2: 'assets/images/19-8.jpg',
      img3: 'assets/images/20-8.jpg',
      name: '吕不韦',
    },
    {
      img1: 'assets/images/17-9.jpg',
      img2: 'assets/images/19-9.jpg',
      img3: 'assets/images/20-9.jpg',
      name: '孔子',
    },
    {
      img1: 'assets/images/17-10.jpg',
      img2: 'assets/images/19-10.jpg',
      img3: 'assets/images/20-10.jpg',
      name: '孙武',
    },
    {
      img1: 'assets/images/17-11.jpg',
      img2: 'assets/images/19-11.jpg',
      img3: 'assets/images/20-11.jpg',
      name: '扁鹊',
    },
  ];

  // 提示框
  async tips() {
    const toast = await this.toastController.create({
      message: '上香成功新加1个学识明天继续',
      color: 'primary',
      position: 'middle',
      duration: 2000
    });
    toast.present();
  }

  // 询问框
  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: '确定',
      message: '需要登录才能礼拜,前去登录',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('取消');
          }
        }, {
          text: '登录',
          handler: () => {
            this.nav.navigateForward('login');
          }
        }
      ]
    });

    await alert.present();
  }

  // 调用礼拜接口
  visitFn(param) {
    this.http.post('/api/v1/wisdom/token/worship', param).subscribe((info: any) => {
      if (info.status === 200) {
        this.tips();
        const userInfo: any = StateMange.getUserInfo();
        userInfo.wisdom = userInfo.wisdom * 1 + 1;
        window.localStorage.setItem('gx_userInfo', JSON.stringify(userInfo));
      }
    });
  }

  // 上香
  lighting(name) {
    if (StateMange.getLoginState()) { // 已经登录
      this.visitFn({name});
    } else { // 没有登录
      this.presentAlertConfirm();
    }
  }
}
