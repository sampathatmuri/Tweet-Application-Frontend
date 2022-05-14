import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

const TOKEN_KEY = 'jwt';
const ID_KEY = 'id';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  saveToken(token: string) {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.setItem(TOKEN_KEY, token);
  }

  getToken(): any {
    return window.localStorage.getItem(TOKEN_KEY);
  }

  validateToken(): boolean {
    var token = this.getToken();
    if (token != null) {
      return true;
    }
    return false;
  }

  saveId(id: string) {
    const userinfo = CryptoJS.AES.encrypt(JSON.stringify(id), 'mys_scret_key').toString()
    localStorage.setItem(ID_KEY, JSON.stringify(userinfo))
  }

  getId() {
    const eText = JSON.parse(localStorage.getItem(ID_KEY)!).toString()
    const decryptedWord = CryptoJS.AES.decrypt(eText,'mys_scret_key')
    const decryptedData = JSON.parse(decryptedWord.toString(CryptoJS.enc.Utf8));
    return decryptedData;
  }

  removeToken() {
    window.localStorage.removeItem(ID_KEY);
    window.localStorage.removeItem(TOKEN_KEY);
  }
}
