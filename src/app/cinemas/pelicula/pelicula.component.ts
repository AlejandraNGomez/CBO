import { Component, OnInit } from '@angular/core';
import { Pelicula } from './pelicula';
import { PeliculaService } from './pelicula.service';
import { CinemaService } from '../cinema.service';
import { SalaService } from '../sala/sala.service';

@Component({
  selector: 'app-peliculas',
  templateUrl: './pelicula.component.html'
})
export class PeliculasComponent implements OnInit {

  peliculas: Pelicula[];  
  public titulo: string = "Películas Relevantes";

  constructor(private peliculaService:PeliculaService, private cinemaService: CinemaService, private salaSevice: SalaService ) { }

  ngOnInit(): void {
    this.peliculaService.getPeliculasxCiudad().subscribe(
      (peliculas) => {
        this.peliculas = peliculas
        for (let i=0; i< this.peliculas.length; i++){
          this.cinemaService.getCinema(this.peliculas[i].cinema.id).subscribe(
            (cinema) => {
              this.peliculas[i].cinema = cinema;
            }
          );
          this.salaSevice.getSalas(this.peliculas[i].sala.id).subscribe(
            (sala) => {
              this.peliculas[i].sala = sala;
            }
          )
        }
      }
    );
  }

  

}
