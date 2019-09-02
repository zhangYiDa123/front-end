import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import {StateMange} from '../../http/stateMange';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {

  constructor(public nav: NavController, public toastController: ToastController) {}

  parentVal = '个人设置';

  ngOnInit() {}

  loginOut() {
    StateMange.clearUserInfo();
    this.toastFn();
    setTimeout(() => {
      this.nav.navigateForward('tabs/tab1');
    }, 1000);
  }

  async toastFn(){
    const toast = await this.toastController.create({
      message: '退出成功',
      color: 'primary',
      position: 'top',
      duration: 2000
    });
    toast.present();
  }
}
