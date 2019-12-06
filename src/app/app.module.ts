import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { NgZorroAntdModule, NZ_I18N, en_US, zh_CN } from 'ng-zorro-antd';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

import { registerLocaleData } from '@angular/common';
// import en from '@angular/common/locales/en';
import zh from '@angular/common/locales/zh';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './pages/not-found/not-found.component';

import { AuthService } from './configs/provider/auth.service';
import { StorageService } from './configs/provider/storage.service';
import { ApiService } from './configs/provider/api.service';
import { AuthGuardService } from './configs/provider/auth-guard.service';
import { CookieService } from 'ngx-cookie-service';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MainService } from './pages/main/main.service';
import { HTTP_INTERCEPTOR_PROVIDERS } from './interceptors/_index';

registerLocaleData(zh);

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgZorroAntdModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    { provide: NZ_I18N, useValue: zh_CN },
    AuthService,
    AuthGuardService,
    CookieService,
    StorageService,
    ApiService,
    MainService,
    HTTP_INTERCEPTOR_PROVIDERS // http拦截器
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  // constructor(router: Router) {
  //   console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
  // }
}
