import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Evaluation } from '../Model/Evaluation';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class EvaluationService {




  constructor(private http:HttpClient) { }
    findEvaluationById(id: number): Observable<Evaluation> {
        const url = `${environment.baseUrl + "/evaluation/getEvaluation"}/${id}`;
        return this.http.get<Evaluation>(url, httpOptions)
    }
    updateEvaluation(id: number, evaluation: Evaluation) {
        const url = `${environment.baseUrl + "/evaluation/updateEvaluation"}/${id}`
        return this.http.put<any>(url, evaluation);
    }

    // addEvaluation(evaluation: Evaluation) {
    //     return this.http.post<any>(environment.baseUrl + "/evaluation/addEvaluation", evaluation, httpOptions);
    // }
    addEvaluation(id:string,evaluation: Evaluation) {
      return this.http.post<any>(`${environment.baseUrl + "/evaluation/addEvaluation"}/${id}`, evaluation, httpOptions);
  }
   
  deleteEvaluation(id: string) {
        const url = `${environment.baseUrl + "/evaluation/deleteEvaluation"}/${id}`
        return this.http.delete(url, httpOptions)
    }
  getEvaluationsByEmployee() {
        return this.http.get<any[]>(environment.baseUrl + "/evaluation/average-ratings");
    }
    getEvaluations() {
        return this.http.get<Evaluation[]>(environment.baseUrl + "/evaluation/getAllEvaluations");
    }
   
      getAllEvaluationsByEmployee(employee: string) {
        const url = `${environment.baseUrl + "/evaluation/getEvaluationsByEmployee"}/${employee}`
        return this.http.get<Evaluation[]>(url, httpOptions)
    }
  
}
