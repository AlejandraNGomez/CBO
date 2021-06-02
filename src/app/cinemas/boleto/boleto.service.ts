import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Boleto } from './boleto';

@Injectable()
export class BoletoService {

  private urlEndpoint: string = 'http://localhost:8080/api/boletos';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

  constructor(private http: HttpClient) { }

  create(boleto: Boleto): Observable<Boleto> {
    return this.http.post<Boleto>(this.urlEndpoint, boleto, { headers: this.httpHeaders })
  }

  getBoletos(id): Observable<Boleto[]> {
    return this.http.get<Boleto[]>(`${this.urlEndpoint}/cedula/${id}`)
  }
  getAllBoletos(): Observable<Boleto[]> {
    return this.http.get<Boleto[]>(`${this.urlEndpoint}`)
  }
  
  update(boleto: Boleto): Observable<Boleto> {
    return this.http.put<Boleto>(`${this.urlEndpoint}/${boleto.id}`, boleto, { headers: this.httpHeaders })
  }

  delete(id: number): Observable<Boleto> {
    return this.http.delete<Boleto>(`${this.urlEndpoint}/${id}`, { headers: this.httpHeaders })
  }

}
