import { Component, OnInit } from '@angular/core';
import { HttpServeService } from '../../http/http-serve.service';
import { StateMange } from '../../http/stateMange';
@Component({
  selector: 'app-invitation-history',
  templateUrl: './invitation-history.page.html',
  styleUrls: ['./invitation-history.page.scss'],
})
export class InvitationHistoryPage implements OnInit {

  constructor(public http: HttpServeService) { }

  parentVal = '邀请记录';
  invitationList: any = [];
  inviteAuthNum: any = 0;
  authInviteWisdom: any = 0;

  // 获取邀请记录列表
  getInvitationList() {
    this.http.post('/api/v1/user/token/invite-record/get').subscribe((info: any) => {
      console.log(info);
      if (info.status === 200) {
        this.invitationList = info.data
        ? info.data.recordDetailPageInfo.list
        : [];
        if (info.data) {
          this.inviteAuthNum = info.data.inviteAuthNum;
          this.authInviteWisdom = info.data.authInviteWisdom;
        }
      }
    });
  }

  // 返回认证状态
  returnAuth(type) {
    return StateMange.AuthState(type);
  }

  /**
   * 进行脱敏处理
   * @param {number} type 1邮箱 2手机
   * @param {string} value 传入的值
   */
  desenFn(type, value) {
    return StateMange.desensitizationFn(type, value);
  }

  ngOnInit() {
    this.getInvitationList();
  }

}
