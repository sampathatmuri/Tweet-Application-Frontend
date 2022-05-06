import { HttpClient, HttpResponseBase } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { api } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  target: string = '';

  constructor(private _http: HttpClient) { }

  postUser(user: any): Observable<HttpResponseBase> {
    return this._http.post(`${api.route}/${this.target}`, user, { observe: 'response' });
  }
  getUserById(id: any): Observable<HttpResponseBase> {
    return this._http.get(`${api.route}/${this.target}/${id}`, { observe: 'response'});
  }
}
