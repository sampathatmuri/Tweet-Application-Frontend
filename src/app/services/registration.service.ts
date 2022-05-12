import { HttpClient, HttpHeaders, HttpResponseBase } from '@angular/common/http';
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
    let reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    this.target = "register"
    return this._http.post(`${api.route}/${this.target}`, user, { headers: reqHeader, observe: 'response', responseType: 'text' });
  }

}
