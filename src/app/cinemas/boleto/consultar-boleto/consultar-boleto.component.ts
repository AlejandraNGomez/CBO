import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import { Boleto } from '../boleto';
import { BoletoService } from '../boleto.service';
import swal from 'sweetalert2'
import { PeliculaService } from '../../pelicula/pelicula.service';
import { CinemaService } from '../../cinema.service';
import { SalaService } from '../../sala/sala.service';

@Component({
  selector: 'app-consultar-boleto',
  templateUrl: './consultar-boleto.component.html'
})
export class ConsultarBoletoComponent implements OnInit {

  public titulo: string = "Consultar Boleto";
  public boleto: Boleto = new Boleto();
  boletos: Boleto[];

  constructor(private boletoService: BoletoService, private peliculaService: PeliculaService, private cinemaService:CinemaService,private salaService:SalaService) { }

  ngOnInit(): void {
    this. getBoleto();
  }

  getBoleto(): void {
    if(this.boleto.cedulaCliente!=null){
      console.log('boleto'+this.boleto.cedulaCliente);
      this.boletoService.getBoletos(this.boleto.cedulaCliente).subscribe(
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
    }else{
      console.log('ERROR NO EXISTE');
    }
  }

  delete(boletos: Boleto): void {
    swal({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar el boleto ${boletos.id} ?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false,
      reverseButtons: true
    }).then((result) => {
      if (result.value) {

        this.boletoService.delete(boletos.id).subscribe(
          response => {
            swal(
              'Boleto Eliminado!',
              `boleto ${boletos.id} eliminado con éxito.`,
              'success'
            )
          }
        )

        this.boleto.id =null;
      }
    })

  }

}
