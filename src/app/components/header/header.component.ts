import { Component, OnInit, Input, Output, EventEmitter, ElementRef, AfterViewInit, TemplateRef } from '@angular/core';
import { FormItem } from '../form/form.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit {

  /**
   * default: 主页模式 / inline: 内联模式 / custom: 自定义内容
   */
  @Input() mode: 'default' | 'inline' | 'custom' = 'default';

  /**
   * default: 默认样式 / light: 亮色主题（background-color: #fff）
   */
  @Input() theme: 'default' | 'light' = 'default';

  /**
   * 面包屑，默认获取路由静态数据
   */
  @Input() breadcrumbs: any[];

  /**
   * 高级搜索是否可见
   */
  @Input() isAwVisible = false;

  /**
   * 自定义模式下的菜单栏模板
   */
  @Input() customTemplateRef: TemplateRef<any>;

  /**
   * inline 模式默认的表单内容
   */
  @Input() formItems: FormItem[] = [];

  @Output() resize: EventEmitter<any> = new EventEmitter();
  @Output() submitted: EventEmitter<any> = new EventEmitter();

  _breadcrumbsWrap: HTMLElement;
  _advanceSearchWrap: HTMLElement;

  constructor(
    private el: ElementRef,
    private route: ActivatedRoute
  ) {
    this.breadcrumbs = this.route.snapshot.data.breadcrumbs;
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this._breadcrumbsWrap = this.el.nativeElement.querySelector('.breadcrumbs-wrap');
    this._advanceSearchWrap = this.el.nativeElement.querySelector('.advance-wrap');
    // 定义默认高度
    this.el.nativeElement.style.height = this._breadcrumbsWrap.clientHeight + 'px';
  }

  collapse() {
    this.isAwVisible = !this.isAwVisible;
    if (!!this.isAwVisible) {
      // 展开
      this.el.nativeElement.classList.add('advance-wrap-visible');
      this.el.nativeElement.style.height = this._breadcrumbsWrap.clientHeight + this._advanceSearchWrap.clientHeight + 'px';
      this.resize.emit(this._advanceSearchWrap.clientHeight);
    } else {
      // 收缩
      this.el.nativeElement.classList.remove('advance-wrap-visible');
      this.el.nativeElement.style.height = this._breadcrumbsWrap.clientHeight + 'px';
      this.resize.emit(-this._advanceSearchWrap.clientHeight);
    }
  }

  submit(value) {
    this.submitted.emit(value);
  }
}
