import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Conge } from '../Model/Conge';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CongeServiceService {

  constructor(private _http: HttpClient) {}

  getAllConge(): Observable<Conge[]> {
    return this._http.get<Conge[]>(`${environment.baseUrl}/conge`);
  }

  addConge(conge: Conge): Observable<Conge> {
    return this._http.post<Conge>(`${environment.baseUrl}/conge`, conge);
  }

  deleteConge(congeId: string): Observable<Conge> {
    return this._http.delete<Conge>(`${environment.baseUrl}/conge/${congeId}`);
  }

  getCongeById(congeId: string): Observable<Conge> {
    return this._http.get<Conge>(`${environment.baseUrl}/conge/${congeId}`);
  }

  modifyConge(conge: any): Observable<Conge> {
    return this._http.put<Conge>(`${environment.baseUrl}/conge/${conge._id}`, conge);
  }
}
