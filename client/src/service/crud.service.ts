import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MessageService} from "./message.service";
import {Observable, of} from "rxjs";
import {catchError, map, tap} from "rxjs/operators";
const httpOptions = {
  headers: new HttpHeaders({'Content-Type' : 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class CrudService<T> {
  url: string = "";
  collectionField: string = "";
  itemField: string = "";

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
  ) { }

  setUrl(url: string) {
    this.url = url;
  }

  getAll(): Observable<T[]> {
    this.messageService.add('Fetched list of objects');
    return this.http.get<T[]>(this.url)
    .pipe(map((data:any) => {return data['_embedded'][this.collectionField]}),
      catchError(this.handleError('get objects', [])));
  }

  getOne(id: number): Observable<T> {
    this.messageService.add(`fetched object with id = ${id}`);
    const fullUrl = `${this.url}/${id}`;
    return this.http.get<T>(fullUrl).pipe(map((data: any) => {return data['_embedded'][this.itemField]}),
      catchError(this.handleError<T>(`get object id=${id}`))
    );
  }

  updateOne(object: T): Observable<T> {
    return this.http.post<T>(this.url, object, httpOptions).pipe(
      map((data: any) => {return data['_embedded'][this.itemField]}),
      catchError(this.handleError<T>('add Object'))
    );
  }

  deleteOne(id: number): Observable<T> {
    const fullUrl = `${this.url}/${id}`;
    return this.http.delete<T>(fullUrl, httpOptions).pipe(
      tap(_ => this.log(`deleted object id=${id}`)),
      catchError(this.handleError<T>('delete Object'))
    );
  }

  searchOne(term: string): Observable<T[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<T[]>(`${this.url}/?name=${term}`).pipe(
      tap(_ => this.log(`found object matching "${term}"`)),
      catchError(this.handleError<T[]>('search Object', []))
    );
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}



