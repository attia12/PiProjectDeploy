import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { $ } from '@fullcalendar/core/internal-common';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ContractService {



  constructor(private http: HttpClient) {}

  createContract(contractData: any): Observable<any> {
      return this.http.post<any>(`${environment.baseUrl}/contract`, contractData);
  }

  signContract(contractId: string, signature: string): Observable<any> {
      return this.http.put<any>(`${environment.baseUrl}/contract/${contractId}/sign`, { signature });
  }
}
