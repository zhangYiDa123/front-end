import { Component, OnInit } from '@angular/core';
import { HttpServeService } from '../../http/http-serve.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.page.html',
  styleUrls: ['./address-list.page.scss'],
})
export class AddressListPage implements OnInit {

  constructor(
    public http: HttpServeService,
    public activeRoute: ActivatedRoute,
    public router: Router,
  ) { }
  parentVal = '收件地址列表';
  addressList: any = [];
  type: any = null;
  id: any = 0;

  ngOnInit() {
    this.activeRoute.queryParams.subscribe((params: Params) => {
      this.type = params.params;
      this.id = params.id;
    });
  }

  // 获取配送地址
  getAddress(params: any) {
    this.http.post('/api/v1/address/token/list', params).subscribe((info: any) => {
      if (info.status === 200) {
        this.addressList = info.data ? info.data.list : [];
      }
    });
  }


  // 添加新地址
  addNew() {
    this.router.navigate(['/address'], {
      queryParams: {
        params: this.type,
        id: this.id,
      }
    });
  }

  // 选择收件地址
  checkAddress(addressId: any) {
    this.router.navigate(['/order'], {
      queryParams: {
        params: this.type,
        id: this.id,
        addressId,
      }
    });
  }

  // 截取汉字的第一个字
  getFirst(str: any) {
    if (str && str.length > 0) {
      return str.substring(0, 1);
    } else {
      return '收';
    }
  }


  // ionic
  ionViewDidEnter() {
    this.getAddress({pageNum: 1, pageSize: 100});
  }
}
