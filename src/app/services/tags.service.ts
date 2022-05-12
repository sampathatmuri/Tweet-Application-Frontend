import { HttpClient, HttpResponseBase } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { api } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TagsService {

  constructor(private http: HttpClient) { }

  getTrendingTagsFromApi(): Observable<any> {
    let target = `trends`;
    return this.http.get(`${api.route}/${target}`);
  }

  getTrendingTweetByTagFromApi(tag:string):Observable<any>{
    let target = `trendByTag/${tag}`;
    return this.http.get(`${api.route}/${target}`);
  }
}
