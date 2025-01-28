import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Coffee } from '../types/coffee';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CoffeeApiService {
  private apiURL = 'https://fake-coffee-api.vercel.app/api';

  constructor(private http: HttpClient) {}

  /*
    CRUD Methods for consuming RESTful API
  */

  // Note: This particular API does not like the client (us) setting the Content-Type
  // but note that for many JSON endpoints, you will need to use this header.
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  // GET
  getCoffees(): Observable<Coffee[]> {
    console.log('getting coffees')
    return this.http.get<Coffee[]>(this.apiURL, {
      params: new HttpParams().set('sort', 'desc')
    } )
  }

  // GET by ID
  getCoffee(id: number): Observable<Coffee> {
    return this.http
      .get<Coffee>(this.apiURL + '/' + id)
      .pipe(retry(1), catchError(this.handleError));
  }

  // POST
  createCoffee(coffee: Partial<Coffee>): Observable<Coffee> {
    return this.http
      .post<{success: boolean, added: Coffee }>(
        this.apiURL,
        JSON.stringify(coffee)
      )
      .pipe(map(res => res.added), retry(1), catchError(this.handleError));
  }

  // PUT
  updateCoffee(coffee: Partial<Coffee>): Observable<Coffee> {
    return this.http
      .put<{ message: string, update: Coffee}>(
        this.apiURL + '/' + coffee.id,
        JSON.stringify(coffee)
      )
      .pipe(map(res => res.update), retry(1), catchError(this.handleError));
  }

  // DELETE
  deleteCoffee(id: number) {
    return this.http
      .delete<Coffee>(this.apiURL + '/' + id)
      .pipe(retry(1), catchError(this.handleError));
  }

  // Error handling
  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => {
      return errorMessage;
    });
  }
}