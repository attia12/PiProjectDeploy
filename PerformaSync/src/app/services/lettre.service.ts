import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LettreDeMotivationDto } from '../dto/lettre-de-motivation.dto';

@Injectable({
  providedIn: 'root'
})
export class LettreService {
  baseUrl="http://localhost:3000"
  constructor(private http: HttpClient) {}
  getUserName(userId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/user/getUserById/${userId}`);
  }

  insererLettre(lettreDto: LettreDeMotivationDto): Observable<any> {
    const formData = new FormData();
    formData.append('cv', lettreDto.cv);
    formData.append('description', lettreDto.description);
    return this.http.post(`${this.baseUrl}/lettre-de-motivation/insertion`, formData);
  }
  
  getLettres()
  {
    return this.http.get(`${this.baseUrl}/lettre-de-motivation/getLettres`)
  }
  deleteLettre(id:string)
  {
    return this.http.delete(`${this.baseUrl}/lettre-de-motivation/supprimer/${id}`)
  }
  validerLettre(lettre:any,id:string)
  {
    return this.http.put(`${this.baseUrl}/lettre-de-motivation/modifier/${id}`,lettre)
  }
  
  sendMeet(meetDto: any, id: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/meeting/envoyerMeet/${id}`, meetDto);
  }
  getMeetByUserId(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/meeting/byUser`);
  }

}
