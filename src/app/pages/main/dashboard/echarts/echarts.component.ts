import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef } from '@angular/core';

import * as echarts from 'echarts';
import 'echarts/theme/macarons.js';
import { subMinutes, format } from 'date-fns';

import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-echarts',
  templateUrl: './echarts.component.html',
  styleUrls: ['./echarts.component.scss']
})
export class EchartsComponent implements OnInit, AfterViewInit, OnDestroy {

  // app-header
  breadcrumbs: { label: string, url: string }[] = [];

  now: Date = new Date();

  private lineChart: echarts.ECharts;
  private _lineInterval: any;

  constructor(
    private el: ElementRef,
    private translate: TranslateService
  ) {
    this.translate.get('DASHBOARD_G2.BREADCRUMBS').subscribe(value => {
      Object.keys(value).forEach(key => {
        this.breadcrumbs.push(JSON.parse(value[key]));
      });
    });
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.renderLine();
  }

  ngOnDestroy(): void {
    if (this._lineInterval) {
      clearInterval(this._lineInterval);
    }
  }

  renderLine() {
    const cardBody: HTMLElement = this.el.nativeElement.querySelector('.ant-card-body');
    const el: any = document.getElementById('echart');

    let time = this.now.getTime();
    let lastTime = subMinutes(time, 1).getTime();
    const xdata = [];
    const sdata = [];
    while (time > lastTime) {
      const second = format(lastTime, 'mm:ss');
      xdata.push(second);
      sdata.push(Math.random());
      lastTime += 1000;
    }

    const option: echarts.EChartOption = {
      animation: false,
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross'
        }
      },
      xAxis: {
        name: '时间（分：秒）',
        type: 'category',
        data: xdata
      },
      yAxis: {
        name: '销售额（万）',
        type: 'value'
      },
      series: [{
        data: sdata,
        type: 'line'
      }]
    };
    this.lineChart = echarts.init(el, 'macarons', {
      width: cardBody ? cardBody.offsetWidth * 0.9  : window.innerWidth,
      height:  cardBody ? cardBody.offsetHeight * 0.9 : window.innerHeight
    });
    this.lineChart.setOption(option);

    this._lineInterval = setInterval(() => {
      const _xdata = xdata;
      const _sdata = sdata;
      const second = format(time, 'mm:ss');
      _xdata.shift();
      _xdata.push(second);
      _sdata.shift();
      _sdata.push(Math.random());

      const _option: any = this.lineChart.getOption();
      _option.xAxis[0].data = _xdata;
      _option.series[0].data = _sdata;
      this.lineChart.setOption(_option);
      time += 1000;
    }, 1000);
  }
}
