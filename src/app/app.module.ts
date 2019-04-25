import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';

import { PageNotFoundComponent } from './page/not-found/not-found.component';
import { AuthService } from './config/provider/auth.service';
import { StorageService } from './config/provider/storage.service';
import { ApiService } from './config/provider/api.service';
import { AuthGuardService } from './config/provider/auth-guard.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
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
  constructor(router: Router) {
    console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
  }
}
