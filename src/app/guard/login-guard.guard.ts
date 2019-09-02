import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NavController } from '@ionic/angular';
import { HttpServeService } from '../http/http-serve.service';
@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements  CanActivate {

  constructor(public nav: NavController, public http: HttpServeService, public router: Router) {

  }
  // tslint:disable-next-line:max-line-length
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (route.data.needLogin) { // 需要登录才能进入的页面
      const token = window.localStorage.getItem('gx_token');
      if (token == null || token === undefined || token.length <= 0) {
        this.router.navigateByUrl('/login');
        return false;
      }
      // 需要更新用户信息的页面
      if (route.data.needUpDataUserInfo) {
        this.http.post('/api/v1/user/token/user-info/get').subscribe((info: any) => {
          if (info.status === 200) {
            window.localStorage.removeItem('gx_userInfo');
            window.localStorage.setItem('gx_userInfo', JSON.stringify(info.data));
          }
        });
      }
    }
    return true;
  }

}
