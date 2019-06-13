import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';

import { ICompany } from './company';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

const webApiUrl = "https://webapplication320190609102854.azurewebsites.net/";

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

 private getCompanyUrl = webApiUrl + 'api/Company';
 
 constructor(private http: HttpClient) { }

  createCompany (company: ICompany): Observable<ICompany> {
    return this.http.post<ICompany>(this.getCompanyUrl, company, httpOptions)
     .pipe(
       catchError(this.handleError)
     );
   }

  getCompanies(): Observable<ICompany[]> {
    return this.http.get<ICompany[]>(this.getCompanyUrl).pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  getCompany(id: number): Observable<ICompany | undefined> {
    return this.getCompanies().pipe(
      map((company: ICompany[]) => company.find(p => p.ID === id))
    );
  }

  updateCompany(company: ICompany): Observable<ICompany> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.getCompanyUrl}/${company.ID}`;
    return this.http.put<ICompany>(url, company, { headers: headers })
      .pipe(
        tap(() => console.log('updateCompany: ' + company.ID)),
        // Return the product on an update
        map(() => company),
        catchError(this.handleError)
      );
  }

  deleteCompany(id: number): Observable<{}> {
   const url = `${this.getCompanyUrl}/${id}`; // DELETE api/Company/1
   return this.http.delete(url, httpOptions)
     .pipe(
       catchError(this.handleError)
     );
 }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
     
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
