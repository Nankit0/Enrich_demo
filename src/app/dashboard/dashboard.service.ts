import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {URLS} from '../app-url.constant'
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor( private http: HttpClient) { }

  getData():Observable<any>{
    
    return this.http.get<any>(URLS.gettingData)
  }
}
