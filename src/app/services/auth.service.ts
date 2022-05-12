import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { api } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(
    private _http: HttpClient
  ) { }

  authenticate(loginDetails: any): Observable<any> {
    let target: string = 'login';
    let reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    return this._http.post(`${api.route}/${target}`, loginDetails, { headers: reqHeader, observe: 'response' });
  }

  sendOTP(emailId: string, OTP: string): Observable<any> {
    let target: string = `sendOtp/${emailId}`;
    let reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    return this._http.post(`${api.route}/${target}`, OTP, { headers: reqHeader, observe: 'response', responseType: 'text' });
  }

  changePassword(emailId: string, newPassword: string): Observable<any> {
    let target: string = `${emailId}/forgot`;
    let reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    return this._http.put(`${api.route}/${target}`, { "newPassword": newPassword }, { headers: reqHeader, observe: 'response', responseType: 'text' });
  }

}
