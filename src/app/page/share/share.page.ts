import { Component, OnInit, ElementRef } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import { StateMange } from '../../http/stateMange';
@Component({
  selector: 'app-share',
  templateUrl: './share.page.html',
  styleUrls: ['./share.page.scss'],
})
export class SharePage implements OnInit {

  constructor(public nav: NavController, private el: ElementRef, public loadingController: LoadingController) {}

  parentVal = '邀请好友';
  inviteCode: any = '';
  createdCode: any = '';

  ngOnInit() {
    this.createdCode = `http://www.sscoin.me/H5/share?code=${StateMange.getUserInfo().inviteCode}`;
  }

  // 跳转到邀请记录页面
  invitationHistory() {
    this.nav.navigateForward('invitation-history');
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: '复制成功',
      duration: 2000,
      spinner: null,
    });
    await loading.present();
  }

  // 复制邀请码
  copy() {
    const tes = this.el.nativeElement.querySelector('#code');
    tes.select(); // 选择对象 dom对像必须是input 或者 textarea
    document.execCommand('Copy');
    this.presentLoading();
  }

  // ionic生命周期 进入页面触发
  ionViewDidEnter() {
    this.inviteCode = StateMange.getUserInfo().inviteCode;
  }
}
