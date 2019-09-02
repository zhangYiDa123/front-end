import { Component, OnInit } from '@angular/core';
import { Network } from '@ionic-native/network/ngx';
import { ToastController } from '@ionic/angular';
import { Vibration } from '@ionic-native/vibration/ngx';
@Component({
  selector: 'app-network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.scss'],
})
export class NetworkComponent implements OnInit {

  constructor(
    private network: Network,
    private vibration: Vibration,
    public toastController: ToastController,
  ) { }

  // 加载提示
  async toastFn(msg) {
    this.vibration.vibrate(1000);
    const toast = await this.toastController.create({
      message: msg,
      color: 'primary',
      position: 'top',
      duration: 2000
    });
    toast.present();
  }

  ngOnInit() {
    `${this.network.type}` !== null && `${this.network.type}` !== 'null' && `${this.network.type}`
    ? setTimeout(() => {
      `${this.network.type}` === 'none' || `${this.network.type}` === 'NONE'
      ? this.toastFn(`网络连接失败,请尝试连接网络`)
      : this.toastFn(`${this.network.type} 连接成功`);
     }, 4000)
    : console.log('');

    // 监听网络连接状态
    this.network.onDisconnect().subscribe(() => {
      this.toastFn('网络已断开，请检查您的网络');
    });

    // watch network for a connection
    this.network.onConnect().subscribe(() => {
      console.log('network connected!');
      // We just got a connection but we need to wait briefly
      // before we determine the connection type. Might need to wait.
      // prior to doing any api requests as well.
      setTimeout(() => {
        if (this.network.type === 'wifi') {
          console.log('we got a wifi connection, woohoo!');
          this.toastFn('网络已经重新连接');
        }
      }, 1000);
    });
  }

}
