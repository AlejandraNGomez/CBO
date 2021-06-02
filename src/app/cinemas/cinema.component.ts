import { Component, OnInit } from '@angular/core';
import { Cinema } from './cinema';
import { CinemaService } from './cinema.service';
import swal from 'sweetalert2'

@Component({
  selector: 'app-cinemas',
  templateUrl: './cinema.component.html'
})
export class CinemasComponent implements OnInit {

  cinemas: Cinema[];

  constructor(private cinemaService: CinemaService) { }

  ngOnInit(): void {
    this.cinemaService.getCinemas().subscribe(
      (cinemas) => this.cinemas = cinemas //Funciones anonimas en typeScript  
    );
  }

  delete(cinemas: Cinema): void {
    swal({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar al Cinema ${cinemas.nombre} ?`,
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

        this.cinemaService.delete(cinemas.id).subscribe(
          response => {
            this.cinemas = this.cinemas.filter(cin => cin !== cinemas)
            swal(
              'Cinema Eliminado!',
              `cinema ${cinemas.nombre} eliminado con éxito.`,
              'success'
            )
          }
        )

      }
    })
  }

}
