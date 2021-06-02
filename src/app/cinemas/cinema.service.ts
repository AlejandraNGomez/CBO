import { Injectable } from '@angular/core';
import { Cinema } from './cinema';
import { of, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class CinemaService {

  private urlEndpoint: string = 'http://localhost:8080/api/cinemas';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

  constructor(private http: HttpClient) { }

  getCinemas(): Observable<Cinema[]> {
    //return of(CINEMAS);
    return this.http.get<Cinema[]>(this.urlEndpoint);

    /*return this.http.get(this.urlEndpoint).pipe(
      map((response) => response as Cinema[])
    );*/
  }
  create(cinema: Cinema): Observable<Cinema> {
    return this.http.post<Cinema>(this.urlEndpoint, cinema, { headers: this.httpHeaders })
  }

  getCinema(id): Observable<Cinema> {
    return this.http.get<Cinema>(`${this.urlEndpoint}/${id}`)
  }

  update(cinema: Cinema): Observable<Cinema> {
    return this.http.put<Cinema>(`${this.urlEndpoint}/${cinema.id}`, cinema, { headers: this.httpHeaders })
  }

  delete(id: number): Observable<Cinema> {
    return this.http.delete<Cinema>(`${this.urlEndpoint}/${id}`, { headers: this.httpHeaders })
  }



}
