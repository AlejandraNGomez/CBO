import { Injectable } from '@angular/core';
import { Pelicula } from './pelicula';
import { of,Observable } from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable()
export class PeliculaService {

  private urlEndpoint: string = 'http://localhost:8080/api/peliculas';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})
  Http = new XMLHttpRequest();
  nombreCiudad ='';
    
    

  constructor(private http: HttpClient) { }

  getPeliculasxCiudad(): Observable<Pelicula[]>{
    this.getLocation();
    //return this.http.get<Pelicula[]>(this.urlEndpoint);
    //Falta obtener el valor de un div
    var ciu= document.getElementById("ciudad").innerHTML;
    if(ciu == null  || ciu == '' ){
      this.nombreCiudad ='Bogotá';
    }
    return this.http.get<Pelicula[]>(`${this.urlEndpoint}/b/${this.nombreCiudad}`)

  }

  getPeliculas(): Observable<Pelicula[]>{
    return this.http.get<Pelicula[]>(this.urlEndpoint);
  }

  getPelicula(id): Observable<Pelicula>{
    return this.http.get<Pelicula>(`${this.urlEndpoint}/${id}`)
  }

  getPeliculaXCinema(idCinema): Observable<Pelicula[]>{
    return this.http.get<Pelicula[]>(`${this.urlEndpoint}/cinema/${idCinema}`)
  }


  getLocation() {
    var bdcApi = "https://api.bigdatacloud.net/data/reverse-geocode-client"
  
    navigator.geolocation.getCurrentPosition(
      (position) => {
        bdcApi = bdcApi
            + "?latitude=" + position.coords.latitude
            + "&longitude=" + position.coords.longitude
            + "&localityLanguage=en";
        this.getApi(bdcApi);
      },
      (err) => { this.getApi(bdcApi); },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      });
  }
  getApi(bdcApi) {
        this.Http.open("GET", bdcApi);
        this.Http.responseType = 'text';
        this.Http.send();  
        this.Http.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
              console.log('Otro: '+this.responseText['city']);  
              document.getElementById("ciudad").innerHTML =this.responseText['city'];
            }
        };
  }
}