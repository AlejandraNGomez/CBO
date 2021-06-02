import { Injectable } from '@angular/core';
import { of,Observable } from 'rxjs';
import { Sala } from './sala';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable()
export class SalaService {

  private urlEndpoint: string = 'http://localhost:8080/api/sala';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient ) { }


  
  getSalas(id): Observable<Sala>{
    return this.http.get<Sala>(`${this.urlEndpoint}/${id}`)
  }
}
