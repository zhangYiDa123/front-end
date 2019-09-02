import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpServeService } from '../http/http-serve.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(public nav: NavController, public http: HttpServeService) {}

  profileForm = new FormGroup({
    mobile: new FormControl(''),
    password: new FormControl(''),
  });

  rules = {
    mobile: false,
    password: false,
  };

  ngOnInit() {}

  goIndex() {
    this.nav.navigateForward('tabs/tab1');
  }

  /**
   * input框发生改变的事件
   * @param type input框改变的对像
   */
  changInput(type: any) {
    switch (type) {
      case 'mobile':
        this.rules[type] = !this.profileForm.controls[type].valid;
        break;
      case 'password':
        this.rules[type] = !this.profileForm.controls[type].valid;
        break;
      default:
        break;
    }
  }

  loginFn() {
    console.log(this.profileForm.value);
    // api/v1/user/login post
    this.http.post('/api/v1/user/login', this.profileForm.value).subscribe((info: any) => {
      if (info.status === 200) {
        setTimeout(() => {
          this.goIndex();
        }, 800);
      }
    });
  }

  async login() {
    await this.loginFn();
  }
}
