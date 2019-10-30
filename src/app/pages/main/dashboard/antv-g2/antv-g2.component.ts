import { Component, OnInit, OnDestroy, ElementRef, AfterViewInit } from '@angular/core';

import * as G2 from '@antv/g2';
import { format, subMinutes } from 'date-fns';

import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-antv-g2',
  templateUrl: './antv-g2.component.html',
  styleUrls: ['./antv-g2.component.scss']
})
export class AntvG2Component implements OnInit, AfterViewInit, OnDestroy {

  // app-header
  breadcrumbs: { label: string, url: string }[] = [];

  // self props
  now: Date = new Date();
  private chart: G2.Chart;
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

    this.chart = new G2.Chart({
      container: 'line',
      forceFit: true,
      // width: cardBody ? cardBody.offsetWidth * 0.9  : window.innerWidth,
      height: cardBody ? cardBody.offsetHeight * 0.8 : window.innerHeight,
      animate: false
    });

    let time = this.now.getTime();
    let lastTime = subMinutes(time, 1).getTime();
    const data = [];
    while (time > lastTime) {
      const second = format(lastTime, 'mm:ss');
      data.push({
        second,
        value: Math.random()
      });
      lastTime += 1000;
    }
    this.chart.source(data);
    this.chart.tooltip({
      crosshairs: {
        type: 'cross'
      }
    });
    this.chart.scale('value', {
      alias: '销售额(万)'
    });
    this.chart.line().position('second*value');
    this.chart.point().position('second*value').size(4).shape('circle').style({
      stroke: '#fff',
      lineWidth: 1
    });
    this.chart.render();
    this._lineInterval = setInterval(() => {
      const _data = data;
      const second = format(time, 'mm:ss');
      _data.shift();
      _data.push({
        second,
        value: Math.random()
      });
      this.chart.changeData(_data);
      time += 1000;
    }, 1000);
  }
}
