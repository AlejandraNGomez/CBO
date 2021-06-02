import { Component, OnInit } from '@angular/core';
import { Boleto } from './boleto';
import { BoletoService } from './boleto.service';
import { Router, ActivatedRoute } from '@angular/router'
import swal from 'sweetalert2'
import { PeliculaService } from '../pelicula/pelicula.service';
import { Pelicula } from '../pelicula/pelicula';
import { CinemaService } from '../cinema.service';
import { Cinema } from '../cinema';
import { SalaService } from '../sala/sala.service';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-boletos',
  templateUrl: './boleto.component.html'
})
export class BoletoComponent implements OnInit {

  opcionSeleccionado: string = '0';
  opcionSeleccionado1: string = '0';
  sillaT: string = '';
  botones: string[] = ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9', 'A10', 'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9', 'B10',
    'C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9', 'C10', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9', 'D10',
    'E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'E7', 'E8', 'E9', 'E10', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10',
    'G1', 'G2', 'G3', 'G4', 'G5', 'G6', 'G7', 'G8', 'G9', 'G10', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'H7', 'H8', 'H9', 'H10'];

  public boleto: Boleto = new Boleto();
  pelicula: Pelicula[];
  boletos: Boleto[];
  cantSillas : number;
  cinema: Cinema[];
  index: number = 0;
  public titulo: string = "Crear Boleto";
  constructor(private boletoService: BoletoService, private peliculaService: PeliculaService, private cinemaService: CinemaService, private salaService: SalaService,
    private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getCinemas();
  }


  create(): void {

    this.boleto.sillas = this.sillaT;
    this.boletoService.create(this.boleto).subscribe(boleto => {
      this.router.navigate(['/home'])
      swal('Nuevo boleto', `boleto ${boleto.id} creado con éxito!`, 'success')
    }
    );

  }

  getCinemas(): void {
    this.cinemaService.getCinemas().subscribe(
      (cinema) => this.cinema = cinema
    );
  }

  elegirCinema() {
    this.peliculaService.getPeliculaXCinema(this.opcionSeleccionado).subscribe(
      (pelicula) => {
        this.pelicula = pelicula;
        for (let i = 0; i < this.pelicula.length; i++) {

          this.salaService.getSalas(this.pelicula[i].sala.id).subscribe(
            (sala) => {
              this.pelicula[i].sala = sala;
              this.cantSillas = sala.cantSillas;
            }
          )
        }
      }
    );
  }
  
  getBoletos(){
    this.boletoService.getAllBoletos().subscribe(
      (boletos) => {
        this.boletos = boletos
        console.log( this.boletos );
        for (let i=0; i< this.boletos.length; i++){
      
          this.peliculaService.getPelicula(this.boletos[i].pelicula.id).subscribe(
            (pelicula) => {
              this.boletos[i].pelicula = pelicula;
            });
          this.cinemaService.getCinema(this.boletos[i].cinema.id).subscribe(
            (cinema) => {
              this.boletos[i].cinema = cinema
            });
    
          this.salaService.getSalas(this.boletos[i].pelicula.sala.id).subscribe(
            (sala) => {
              this.boletos[i].sala = sala;
            });
        }
      }      
    );

  }



  obtenerSilla(numSilla) {
    this.index = this.index+1;

    if(this.index!=this.cantSillas){
      console.log('Cant' + this.cantSillas +' -  - '+ this.index);
      console.log('numSilla ' + document.getElementById(numSilla).innerText);
      if (this.sillaT != '') {
        this.sillaT = (this.sillaT) + ',' + document.getElementById(numSilla).innerText;
      } else {
        this.sillaT = document.getElementById(numSilla).innerText;
      }
      document.getElementById(numSilla).style.background = "#fff";
    }else{
      document.getElementById('Limite').innerHTML= 'No puedes seleccionar mas sillas el limite de la sala es: '+this.cantSillas;
      
    }
    




    this.peliculaService.getPelicula(this.opcionSeleccionado1).subscribe(
      (pelicula) => {
        this.boleto.pelicula = pelicula;
        this.cinemaService.getCinema(this.opcionSeleccionado).subscribe(
          (cinema) => {
            this.boleto.cinema = cinema
          });

        this.salaService.getSalas(this.boleto.pelicula.sala.id).subscribe(
          (sala) => {
            this.boleto.sala = sala;
          }
        );

      }
    );
    console.log(' this.sillaT ' +  this.sillaT);

  }

  limpiar() {
    this.sillaT = '';
    for (let i = 0; i < this.botones.length; i++) {
      document.getElementById(this.botones[i]).style.background = 'transparent';
      document.getElementById(this.botones[i]).style.borderBottomColor = "#007bff";
    }
  }

}
