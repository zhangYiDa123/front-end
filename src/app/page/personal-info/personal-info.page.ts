import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { HttpServeService } from '../../http/http-serve.service';
import { StateMange } from '../../http/stateMange';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.page.html',
  styleUrls: ['./personal-info.page.scss'],
})
export class PersonalInfoPage implements OnInit {

  constructor(public alertController: AlertController, public nav: NavController, public http: HttpServeService) {}

  parentVal = '个人信息';

  phoneNumber: any = '';

  nickname: any = null;

  idCard: any = null;

  alipayAccount: any = null;

  realname: any = null;

  ngOnInit() {}

  // ionic 生命周期进入页面触发
  ionViewDidEnter() {
    console.log(StateMange.getUserInfo());
    this.phoneNumber = StateMange.getUserInfo().mobile;
    this.nickname = StateMange.getUserInfo().nickname;
    this.alipayAccount = StateMange.getUserInfo().alipayAccount;
    this.idCard = StateMange.getUserInfo().idCard;
    this.realname = StateMange.getUserInfo().realname;
  }

  // 获取更新用户信息
  getUserInfo() {
    this.http.post('/api/v1/user/token/user-info/get').subscribe((info: any) => {
      if (info.status === 200) {
        window.localStorage.setItem('gx_userInfo', JSON.stringify(info.data));
      }
    });
  }

  // 设置用户昵称
  setNicKNameFn(params: any) {
    this.http.post('/api/v1/user/token/nicekname/set', params).subscribe((info: any) => {
      if (info.status === 200) {
        this.getUserInfo();
        this.presentAlert();
      }
    });
  }

  // 提示引导信息
  async presentAlert() {
    const alert = await this.alertController.create({
      header: '您昵称已设置成功',
      message: '是否留下继续设置其它信息',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            this.nav.navigateForward('/tabs/tab1');
          }
        }, {
          text: '确定',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });
    await alert.present();
  }


  async setNickName(type: any, name: any) { // 1设置昵称 2设置手机
    const alert = await this.alertController.create({
      header: `设置${name}`,
      inputs: [
        {
          name: 'name1',
          type: 'text',
          placeholder: `请输入${name}`
        },
      ],
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('取消');
          }
        }, {
          text: '确定',
          handler: (data: any) => {
            if (type === 1) {
              this.setNicKNameFn({nickname: data.name1});
            } else if (type === 2) {

            }
          }
        }
      ]
    });
    await alert.present();
  }

  realName() {
    this.nav.navigateForward('real-name');
  }
}
