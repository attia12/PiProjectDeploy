import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MeetingService {

  
  constructor(private http:HttpClient) { }

  getMeetingByUserId(userId: string): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/meeting/meetByUser/${userId}`);
  }
  getMeets()
  {
    return this.http.get(`${environment.baseUrl}/meeting/meets`)
  }
}
