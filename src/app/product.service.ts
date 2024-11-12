import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'https://localhost:7238/api/Product';

  constructor(private http: HttpClient) { }

  getProjects(): Observable<any> {
   
    return this.http.get<any>(this.apiUrl);
  }
  get(id:number):Observable<any>{
   return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
  
  createProject(project: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, project);
  }

 
  updateProject(id: number, project: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, project);
  }


  deleteProject(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
