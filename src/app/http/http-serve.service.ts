
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RequestMethods } from './RequestMethods';
import { Observable} from 'rxjs';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { StateMange } from './stateMange';
import qs from 'qs';
@Injectable({
  providedIn: 'root'
})


export class HttpServeService {
  constructor(public httpClient: HttpClient, public loadingController: LoadingController, public router: Router) {}
　loading: any;
  loadingIsOpen: any;
  Token = '';
  BaseUrl = 'http://www.sscoin.me'; // 配置baseurl http://www.sscoin.me/
  /**
   * get请求
   * @param url 请求的路径
   * @param paramMap 请求参数
   * @param header 请求头
   */
  get(url: string, paramMap: {} = {}, header: {} = {}): Observable<object> {
    return this.sendRequest(url, paramMap, RequestMethods.GET, header);
  }
  /***
   * 发起一个post请求
   * @param url 请求的路径
   * @param paramMap 请求参数
   * @param header 请求头
   */
  post(url: string, paramMap: {} = {}, header: {} = {}): Observable<object> {
    return this.sendRequest(url, paramMap, RequestMethods.POST, header);
  }

  /***
   * 发起一个delete请求
   * @param url 请求的路径
   * @param paramMap 请求参数
   * @param header 请求头
   */
  delete(url: string, paramMap: {} = {}, header: {} = {}): Observable<object> {
    return this.sendRequest(url, paramMap, RequestMethods.DELETE, header);
  }

  /***
   * 发起一个options请求
   * @param url 请求的路径
   * @param paramMap 请求参数
   * @param header 请求头
   */
  options(url: string, paramMap: {} = {}, header: {} = {}): Observable<object> {
    return this.sendRequest(url, paramMap, RequestMethods.OPTIONS, header);
  }

  /***
   * 发起一个trace请求
   * @param url 请求的路径
   * @param paramMap 请求参数
   * @param header 请求头
  */

  trace(url: string, paramMap: {} = {}, header: {} = {}): Observable<object> {
    return this.sendRequest(url, paramMap, RequestMethods.TRACE, header);
  }

  /***
   * 发起一个head请求
   * @param url 请求的路径
   * @param paramMap 请求参数
   * @param header 请求头
  */
  HEAD(url: string, paramMap: {} = {}, header: {} = {}): Observable<object> {
    return this.sendRequest(url, paramMap, RequestMethods.HEAD, header);
  }

  /***
   * 发起一个patch请求
   * @param url 请求的路径
   * @param paramMap 请求参数
   * @param header 请求头
  */
  patch(url: string, paramMap: {} = {}, header: {} = {}): Observable<object> {
    return this.sendRequest(url, paramMap, RequestMethods.PATCH, header);
  }

  /***
   * 通用的请求方法，通过传入RequestMethods不同以发起不用类型的请求。
   * 默认发起一个Get请求
   * @param url 请求的路径 必传参数
   * @param paramMap 请求参数 默认为空
   * @param method  默认GET
  */
 request(url: string, paramMap: {} = {}, method: RequestMethods = RequestMethods.GET, header: {} = {}): Observable<object> {
  return this.sendRequest(url, paramMap, method, header);
 }


 // 请求过程的加载框
 async presentLoading(msg: any, time: any, spin: any) {
  if (!this.loadingIsOpen) {
    this.loadingIsOpen = true;
    this.loading = await this.loadingController.create({
      message: msg ,
      translucent: true,
      spinner: spin,
      duration: 8000,
    });
    await this.loading.present();
    setTimeout(() => { // 最长显示秒数
  　　// tslint:disable-next-line:no-unused-expression
  　　this.loadingIsOpen && this.loading.dismiss();
  　　this.loadingIsOpen = false;
　　}, time);
  }
 }

 closeLoading = () => {
  setTimeout(() => {
    if (this.loading) {
      // tslint:disable-next-line:no-unused-expression
      this.loadingIsOpen && this.loading.dismiss();
      this.loadingIsOpen = false;
    } else {
      this.closeLoading();
    }
  }, 30);
}

  protected sendRequest(url: string, paramMap: any = {}, method: RequestMethods = RequestMethods.GET, header: {} = {}): Observable<object> {
    if (!(url.includes('/api/v1/jade/token/receive'))) {
      this.presentLoading('加载中...', 15000, 'circles');
    }
    this.Token = window.localStorage.getItem('gx_token')
    ? window.localStorage.getItem('gx_token')
    : '';
    const myheader = {token: this.Token, 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'};
    Object.assign(header, myheader);
    // console.log(Object.assign(header, myheader));
    // console.log('准备发起请求:');
    // console.log('请求路径:', url);
    // console.log('请求参数:', JSON.stringify(paramMap));
    // console.log('请求方法:', method);
    // console.log('请求头:', JSON.stringify(header));
    return Observable.create(observer => {
      const option = method === 'POST'
      ? {
        body: qs.stringify(paramMap),
        headers: header
      }
      : {
        params: paramMap,
        headers: header
      };
      this.httpClient.request(method, `${this.BaseUrl}${url}`, option).subscribe(
        (res: any) => {
          this.closeLoading();
          if (res.status === 200) {
            if (url.includes('login')) {
              setTimeout(() => {
                this.presentLoading('登录成功', 2000, null);
              }, 800);
              this.Token = res.data.token;
              window.localStorage.removeItem('gx_token');
              window.localStorage.removeItem('gx_userInfo');

              window.localStorage.setItem('gx_token', this.Token); // 设置token
              window.localStorage.setItem('gx_userInfo', JSON.stringify(res.data)); // 登录成功后存储用户信息
            }
          } else if (res.status === 501) {
            this.presentLoading(res.msg, 2000, null);
            StateMange.clearUserInfo();
            this.router.navigateByUrl('/login');
          } else {
            setTimeout(() => {
              this.presentLoading(res.msg, 2000, null);
            }, 800);
          }
          observer.next(res);
        }, err => {
          this.handle(err);
          setTimeout(() => {
            this.loading.dismiss();
          }, 800);
        }
      );
    });
  }


  handle(res: any): any {
    switch (res.status) {
      case 200:
        this.presentLoading('业务异常', 2000, null);
        break;
      case 404:
        this.presentLoading('请求失败，未找到请求地址!', 2000, null);
        break;
      case 500:
        this.presentLoading('请求失败，服务器出错，请稍后再试!', 2000, null);
        break;
      case 0:
        this.presentLoading('请求失败，请求响应出错!', 2000, null);
        break;
      default:
        this.presentLoading('抱歉系统异常！', 2000, null);
        break;
    }
    return res;
  }
}
