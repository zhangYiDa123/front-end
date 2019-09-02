import { Component, OnInit } from '@angular/core';
import { NavController, ActionSheetController } from '@ionic/angular';
import { StateMange } from '../../app/http/stateMange';
declare var Wechat;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})

export class SidebarComponent implements OnInit {

  constructor(public nav: NavController, public actionSheetController: ActionSheetController) { }

  // tslint:disable-next-line:max-line-length
  img = 'http://www.sscoin.me/images/yu_tiny.png';
  link = StateMange.getLoginState()
    ? `http://www.sscoin.me/H5/share?code=${StateMange.getUserInfo().inviteCode}`
    : `http://www.sscoin.me/H5/share?`;
  // 分享到微信 scene 0, // 聊天界面 1, // 朋友圈 2 // 收藏
  wxShare(scene) {
    try {
      Wechat.share({
        message: {
          title: '国学世界',
          description: '国学世界，带你走进首个区块链传统文化,邀请越多每天坐等收益，免费撸，每日礼拜，邀请好友送算力，注册成功，首次登录就送100',
          thumb: this.img,
          mediaTagName: 'TEST-TAG-001',
          messageExt: '', // 这是第三方带的测试字段
          media: {
            type: Wechat.Type.WEBPAGE,
            webpageUrl: this.link
          }
        },
        scene: scene === 0
        ? Wechat.Scene.SESSION
        : Wechat.Scene.TIMELINE  // share to Timeline
      }, () => {
        alert('成功');
      }, (reason) => {
        alert('分享失败: ' + reason);
      }
      );
    } catch (e) {
      //
    }
  }

  ngOnInit() {}

  goPage(path) {
    this.nav.navigateForward(path);
  }
  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: '分亨',
      buttons: [{
        text: '微信好友',
        role: 'destructive',
        icon: 'git-branch',
        handler: () => {
          this.wxShare(0);
        }
      }, {
        text: '微信朋友圈',
        icon: 'aperture',
        handler: () => {
          this.wxShare(1);
        }
      }, {
        text: '取消',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('取消');
        }
      }]
    });
    await actionSheet.present();
  }
  share() {
    this.presentActionSheet();
  }
}
