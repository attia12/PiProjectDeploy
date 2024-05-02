import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TimeEntry } from '../Model/TimeEntry';
import { environment } from '../../environments/environment.development';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TimeEntryService {

 

  constructor(private http:HttpClient) { }
    findTimeEntryById(id: string): Observable<TimeEntry> {
        const url = `${environment.baseUrl + "/timeEntry/getTimeEntry"}/${id}`;
        return this.http.get<TimeEntry>(url, httpOptions)
    }
    updateTimeEntry(id: string, timeEntry: TimeEntry) {
        const url = `${environment.baseUrl + "/timeEntry/updateTimeEntry"}/${id}`
        return this.http.put<any>(url, timeEntry);
    }

    addTimeEntry(timeEntry: TimeEntry) {
        return this.http.post<any>(environment.baseUrl + "/timeEntry/addTimeEntry", timeEntry, httpOptions);
    }
   
  deleteTimeEntry(id: string) {
        const url = `${environment.baseUrl + "/timeEntry/deleteTimeEntry"}/${id}`
        return this.http.delete(url, httpOptions)
    }
 
    getTimeEntriesByEmployeeAndDate(employee:string,date:string) {
        return this.http.get<TimeEntry[]>(environment.baseUrl + "/timeEntry/getTimeEntriesByEmployeeAndDate");
    }
    getTimeEntries() {
        return this.http.get<TimeEntry[]>(environment.baseUrl + "/timeEntry/getAllTimeEntries");
    }
   
      getAllTimeEntriesByEmployee(employee: string) {
        const url = `${environment.baseUrl + "/timeEntry/getTimeEntriesByEmployee"}/${employee}`
        return this.http.get<TimeEntry[]>(url, httpOptions)
    }

    updateTimeEntryByEmployeeDate(employee:string,date:string, timeEntry: TimeEntry) {
        const url = `${environment.baseUrl + "/timeEntry/updateTimeEntryByEmployeeDate"}`
        return this.http.put<any>(url, timeEntry);
    }

}
