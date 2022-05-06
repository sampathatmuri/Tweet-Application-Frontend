import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { api } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  target: string = 'login';

  constructor(
    private _http: HttpClient
  ) { }

  authenticate(loginDetails: any): Observable<any> {
    return this._http.post(`${api.route}/${this.target}`, loginDetails, { observe: 'response' });
  }
}
