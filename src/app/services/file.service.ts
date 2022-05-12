import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { api } from 'src/environments/environment';
import { Download } from '../helper/dto/download';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient) { }

  downloadFile(): Observable<any> {
    let target = `all`;
    return this.http.get<any>(`${api.route}/${target}`);
  }
}
