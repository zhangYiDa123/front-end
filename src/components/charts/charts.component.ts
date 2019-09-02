import { Component, OnInit} from '@angular/core';
import { EChartOption } from 'echarts';
import { HttpServeService } from '../../app/http/http-serve.service';
@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss'],
})
export class ChartsComponent implements OnInit {
  // 这些配置文件可以直接从echart中的官网去拉取，该组件完全支持echart的所有图形
  public chartOption: EChartOption;
  public option: EChartOption;
  xAxisData: any = [];
  yAxisData: any = [];
  taDayPrice: any = 0.00;
  constructor(public http: HttpServeService) {}

  // 获取价格趋势
  getPrice() {
    this.http.post('/api/v1/jade/jade-price/get', {length: 7}).subscribe((info: any) => {
      if (info.status === 200) {
        if (info.data.list.length > 0) {
          info.data.list.forEach((key, i) => {
            this.xAxisData.unshift(key.priceDay);
            this.yAxisData.unshift(key.jadePrice);
          });
        }
        this.taDayPrice = info.data.list[0].jadePrice;

        this.chartOption = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            }
          },
          grid: {
            top: '40px',
            left: '25px',
            right: '0px',
            bottom: '20px'
          },
          xAxis: {
            type: 'category',
            data: this.xAxisData,
          },
          yAxis: {
            type: 'value',
          },
          series: [{
            type: 'line',
            data: this.yAxisData,
            itemStyle: {
              normal: {
                lineStyle: {
                  color: '#FF8300'
                }
              }
            }
          }]
        };
      }
    });
  }

  ngOnInit() {
    this.getPrice();
  }

}
