import { HttpClient, HttpResponseBase } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { api } from 'src/environments/environment';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class TweetService {

  constructor(private _http: HttpClient, private _storageService: StorageService) { }

  postTweet(tweet: any): Observable<any> {
    let target = `${this._storageService.getId()}/add`;
    return this._http.post(`${api.route}/${target}`, tweet);
  }

  getAllTweetsFromApi(): Observable<any> {
    let target = `all`;
    return this._http.get(`${api.route}/${target}`);
  }

  getAllTweetsOfUserFromApi(emailId: string): Observable<any> {
    let target = `username/${emailId}`;
    return this._http.get(`${api.route}/${target}`);
  }

  likeTweetFromApi(emailId: string, tweetId: string): Observable<any> {
    let target = `${emailId}/like/${tweetId}`;
    return this._http.patch(`${api.route}/${target}`, null);
  }

  replyTweetFromApi(emailId: string, tweetId: string, reply: any): Observable<any> {
    let target = `${emailId}/reply/${tweetId}`;
    return this._http.patch(`${api.route}/${target}`, reply);
  }

  updateTweetFromApi(emailId: string, tweetId: string, tweet: any): Observable<any> {
    let target = `${emailId}/update/${tweetId}`;
    return this._http.put(`${api.route}/${target}`, tweet);
  }

  deleteTweetFromApi(emailId: string, tweetId: string): Observable<any> {
    let target = `${emailId}/delete/${tweetId}`;
    return this._http.delete(`${api.route}/${target}`);
  }
}
