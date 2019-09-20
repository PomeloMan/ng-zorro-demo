import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

export const TOKEN = 'token';
export const EXPIRE = 'expire';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  redirectUrl: string;

  constructor(
    private storageService: StorageService
  ) { }

  getAuthorizationToken(): string {
    return this.storageService.getItem(TOKEN);
  }

  setAuthorizationToken(token): void {
    this.storageService.setItem(TOKEN, token);
  }

  clear(): void {
    this.redirectUrl = null;
    this.storageService.removeItem(TOKEN);
    this.storageService.removeItem('user');
  }
}
