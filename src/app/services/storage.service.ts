import { Injectable } from '@angular/core';

const TOKEN_KEY = 'jwt';
const ID_KEY = 'id';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private ID_KEY!: string | null;

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
    this.ID_KEY = id;
  }

  getId() {
    return this.ID_KEY;
  }

  removeToken() {
    this.ID_KEY = null;
    window.localStorage.removeItem(TOKEN_KEY);
  }
}
