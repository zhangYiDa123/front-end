import { Component, OnInit, ElementRef, EventEmitter, Output, Input } from '@angular/core';
import { ToastController, AlertController, NavController  } from '@ionic/angular';
// import { StateMange } from '../../app/http/stateMange';
import { HttpServeService } from '../../app/http/http-serve.service';
@Component({
  selector: 'app-jade-factory',
  templateUrl: './jade-factory.component.html',
  styleUrls: ['./jade-factory.component.scss'],
})
export class JadeFactoryComponent implements OnInit {
  constructor(
    public http: HttpServeService,
    private el: ElementRef,
    public toastController: ToastController,
    public alertController: AlertController,
    public nav: NavController) { }
    @Output() fromChild = new EventEmitter();
    @Input () treeList: any;
    @Input () devciesWidth: any;
    @Input () singleJade: any;
    @Input () loginState: any;
    @Input () sign: any;
    flag = true;

  async presentToast(msg: any) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 700,
      color: 'primary',
      position: 'top',
    });
    toast.present();
  }

  async presentAlert(msg) {
    const alert = await this.alertController.create({
      header: '提示',
      message: msg,
      buttons: [
        {
          text: '暂不登录',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: '前去登录',
          handler: () => {
            this.nav.navigateForward('login');
          }
        }
      ]
    });

    await alert.present();
  }

  // 跳转到对应页面
  jump(path: any) {
    this.nav.navigateForward(path);
  }

  // 收取玉佩
  charge($event: any, num: any, chargIdx: any) {
    if (!this.loginState) {
      this.presentAlert('未登录不能收取玉佩哦，是否前去登录?');
      return false;
    }

    if (this.flag) {

      // 调用收取玉佩接口
      const param = {
        singleJade: this.singleJade,
        sign: this.sign,
      };

      const userInfo: any = JSON.parse(window.localStorage.getItem('gx_userInfo'));
      userInfo.jade = userInfo.jade * 1 + this.singleJade * 1;
      window.localStorage.setItem('gx_userInfo', JSON.stringify(userInfo));
      this.treeList.forEach((item, index) => {
        if (item.x * 1 === chargIdx * 1) {
          this.flag = false;
          $event.target.parentElement.classList.remove('active');
          $event.target.parentElement.classList.add('changeSmall');
          item.y = -50;
          item.x = Number(this.devciesWidth) / 2 - 30;
          setTimeout(() => {
            this.flag = true;
            this.treeList.splice(index, 1);
          }, 600);
        }
      });

      this.fromChild.emit(num);

      this.http.post('/api/v1/jade/token/receive', param).subscribe((info: any) => {
        if (info.status === 200) {}
      });

    } else {
      this.presentToast('收取中...');
    }

  }

  ngOnInit() {}
}
