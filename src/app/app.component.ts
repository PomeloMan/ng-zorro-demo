import { Component } from '@angular/core';

import { NzI18nService, en_US, zh_CN } from 'ng-zorro-antd';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';

  constructor(
    private i18n: NzI18nService,
    private translate: TranslateService
  ) {
    const browserLang = this.translate.getBrowserLang();
    // nzModule i18n setting
    this.i18n.setLocale(browserLang.match(/zh/) ? zh_CN : en_US);

    // this language will be used as a fallback when a translation isn't found in the current language
    this.translate.setDefaultLang('en');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    this.translate.use(browserLang.match(/en|zh/) ? browserLang : 'en');
  }
}
