import { HttpClient, HttpResponseBase } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { api } from 'src/environments/environment';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient, private _storageService: StorageService) { }


  getAllUsersFromApi(): Observable<any> {
    let target = `users/all`;
    return this._http.get(`${api.route}/${target}`);
  }

  getUserByMailId(emailId: any): Observable<any> {
    let target = "user/search"
    return this._http.get(`${api.route}/${target}/${emailId}`);
  }
}
