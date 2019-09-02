import { Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import { Router } from '@angular/router';
import { HttpServeService } from '../../app/http/http-serve.service';

@Component({
  selector: 'app-buy-card',
  templateUrl: './buy-card.component.html',
  styleUrls: ['./buy-card.component.scss'],
})
export class BuyCardComponent implements OnInit {
  @Output() fromChild = new EventEmitter();
  @Input() orderInfo: any;

  constructor(public router: Router, public http: HttpServeService) { }

  ngOnInit() {
    console.log(this.orderInfo);
  }

  // 确认订单
  receiveJade(param: any) {
    this.http.post('/api/v1/order/token/receive', param).subscribe((info: any) => {
      if (info.status === 200) {
        this.router.navigate(['/order-details'], {
          queryParams: {params: info.data.orderno}
        });
      }
    });
  }

  sumbit(type: any) {
    type === 2
    ? this.receiveJade({orderno: this.orderInfo.orderno})
    : this.fromChild.emit(2);
  }
}
