import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class MissionService {

  constructor(private http:HttpClient) {}
  getMissions()
{
  return this.http.get(`${environment.baseUrl}/misssion`);
}
getMissionsByCompanyId(companyId: string) {
  return this.http.get(`${environment.baseUrl}/misssion/company/${companyId}`);
}
createMission(missionData: any) {
  return this.http.post(`${environment.baseUrl}/misssion`, missionData);
}
getMissionsPending() {
  return this.http.get(`${environment.baseUrl}/misssion/missionPending`);
}
}
