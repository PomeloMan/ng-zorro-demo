import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  dashboard1 = [
    [{ label: 'WBS', key: 'wbs' }, { label: '工序名称', key: 'name' }],
    [{ label: '已完成铁心档数', key: 'num' }, { label: '剩余铁心档数', key: 'lastNum' }],
    [{ label: '已用时', key: 'useTime' }, { label: '机械手A正常运作时间', key: 'aworkTime' }],
    [{ label: '预计剩余时间', key: '' }, { label: '机械手B正常运作时间', key: '' }]
  ];

  dashboard2 = [
    [{ label: 'WBS', key: '' }, { label: '工序名称', key: '' }, { label: '库存余量', key: '' }],
    [{ label: '已完成铁心环', key: '' }, { label: '已用时', key: '' }, { label: '剩余数量', key: '' }],
    [{ label: '剩余铁心环', key: '' }, { label: 'A正常运作时间', key: '' }, { label: 'A片余量', key: '' }],
    [{ label: '预计剩余时间', key: '' }, { label: 'B正常运作时间', key: '' }, { label: 'B片余量', key: '' }]
  ];

  dashboard1Intl: any;

  dashboard1Data: any = {
    wbs: 'B80W30CXXX',
    name: '本体铁心段叠装',
    num: 1
  };

  constructor() { }

  ngOnInit() {
    this.dashboard1Intl = setInterval(() => {
      this.dashboard1Data.num = this.dashboard1Data.num + 1;
    }, 3000);
  }

  ngOnDestroy(): void {
    clearInterval(this.dashboard1Intl);
    // clearInterval()
  }
}
