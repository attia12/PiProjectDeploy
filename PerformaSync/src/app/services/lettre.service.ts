import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LettreDeMotivationDto } from '../dto/lettre-de-motivation.dto';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class LettreService {
  
  private lettreInsererKey = 'lettreInserer';
  constructor(private http: HttpClient) {}
  getUserName(userId: string): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/user/getUserById/${userId}`);
  }

  insererLettre(lettreDto: LettreDeMotivationDto): Observable<any> {
    const formData = new FormData();
    formData.append('cv', lettreDto.cv);
    formData.append('description', lettreDto.description);
    return this.http.post(`${environment.baseUrl}/lettre-de-motivation/insertion`, formData);
  }
  
  getLettres()
  {
    return this.http.get(`${environment.baseUrl}/lettre-de-motivation/getLettres`)
  }
  deleteLettre(id:string)
  {
    return this.http.delete(`${environment.baseUrl}/lettre-de-motivation/supprimer/${id}`)
  }
  validerLettre(lettre:any,id:string)
  {
    return this.http.put(`${environment.baseUrl}/lettre-de-motivation/modifier/${id}`,lettre)
  }
  
  sendMeet(meetDto: any, id: string): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}/meeting/envoyerMeet/${id}`, meetDto);
  }
  getMeetByUserId(): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/meeting/byUser`);
  }
  isLettreInserer(): boolean {
    return localStorage.getItem(this.lettreInsererKey) === 'true';
  }

  setLettreInserer(value: boolean): void {
    localStorage.setItem(this.lettreInsererKey, value.toString());
  }
  getLettreDeMotivationByUser(userId: string): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/lettre-de-motivation/${userId}`);
  }
}
