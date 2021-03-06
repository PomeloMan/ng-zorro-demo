import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class StorageService {

  private _settings: any;
  private storage: Storage;

  constructor() {
    this.setDefault();
    this.init();
  }

  private init() {
    this._settings = JSON.parse(this.storage.getItem(environment.setting) || '{}');
  }

  public setDefault() {
    this.setStorage(localStorage);// or sessionStorage
  }

  public setStorage(storage: Storage) {
    this.storage = storage;
  }

  public setItem(key: string, value: any) {
    this._settings[key] = value;
    this.storage.setItem(environment.setting, JSON.stringify(this._settings));
  }

  public getItem(key: string) {
    if (key === environment.setting) { return this._settings; }
    return this._settings[key];
  }

  public removeItem(key: string) {
    delete this._settings[key];
    this.storage.setItem(environment.setting, JSON.stringify(this._settings));
  }
}
