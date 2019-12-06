import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef } from '@angular/core';

import * as echarts from 'echarts';
import 'echarts/theme/macarons.js';
import { subMinutes, format } from 'date-fns';
import { message } from 'src/app/utils';

import { TranslateService } from '@ngx-translate/core';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-echarts',
  templateUrl: './echarts.component.html',
  styleUrls: ['./echarts.component.scss']
})
export class EchartsComponent implements OnInit, AfterViewInit, OnDestroy {

  downloading = false;

  // self props
  private now: Date = new Date();
  private lineChart: echarts.ECharts;
  private lineInterval: any;

  constructor(
    private el: ElementRef,
    private nzMessageServ: NzMessageService,
    private translate: TranslateService
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.renderLine();
  }

  ngOnDestroy(): void {
    if (this.lineInterval) {
      clearInterval(this.lineInterval);
    }
  }

  /**
   * 下载数据
   */
  download() {
    this.downloading = true;

    setTimeout(() => {
      this.downloading = false;
      this.translate.get([
        'COMMON.DOWNLOAD_SUCCESS',
        'COMMON.DOWNLOAD_FAILURE'
      ]).subscribe(value => {
        message(this.nzMessageServ, 'error', value['COMMON.DOWNLOAD_FAILURE']);
      });
    }, 1000);
  }

  /**
   * 渲染图形
   */
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
      width: cardBody ? cardBody.offsetWidth * 0.9 : window.innerWidth,
      height: cardBody ? cardBody.offsetHeight * 0.9 : window.innerHeight
    });
    this.lineChart.setOption(option);

    this.lineInterval = setInterval(() => {
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
