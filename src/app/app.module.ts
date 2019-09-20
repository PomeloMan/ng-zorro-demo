import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './pages/not-found/not-found.component';

import { AuthService } from './config/provider/auth.service';
import { StorageService } from './config/provider/storage.service';
import { ApiService } from './config/provider/api.service';
import { AuthGuardService } from './config/provider/auth-guard.service';
import { CookieService } from 'ngx-cookie-service';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

registerLocaleData(en);

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
    { provide: NZ_I18N, useValue: en_US },
    AuthService,
    AuthGuardService,
    CookieService,
    StorageService,
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  // constructor(router: Router) {
  //   console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
  // }
}
