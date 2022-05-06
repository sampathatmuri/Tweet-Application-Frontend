import { HttpClient, HttpResponseBase } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { api } from 'src/environments/environment';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class TweetService {

  constructor(private _http: HttpClient,private _storageService:StorageService) { }

  postTweet(tweet: any): Observable<HttpResponseBase> {
    let target = `${this._storageService.getId()}/add`;
    return this._http.post(`${api.route}/${target}`, tweet, { observe: 'response' });
  }
}
