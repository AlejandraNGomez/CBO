import { Component, OnInit } from '@angular/core';
import { Cinema } from './cinema';
import {CinemaService} from './cinema.service'
import { Router,ActivatedRoute } from '@angular/router'
import swal from 'sweetalert2'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  public cinema: Cinema = new Cinema();
  public titulo: string = "Crear Cinema";
  
  constructor(private cinemaService: CinemaService,
              private router: Router, private activatedRoute: ActivatedRoute) { }
  
  ngOnInit() {
    this.cargarCinema()
  }

  cargarCinema(): void{
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if(id){
        this.cinemaService.getCinema(id).subscribe( (cinema) => this.cinema = cinema)
      }
    })
  }
    

  create(): void {
    this.cinemaService.create(this.cinema).subscribe(cinema => {
        this.router.navigate(['/cinemas'])
        swal('Nuevo boleto', `cinema ${cinema.nombre} creado con éxito!`, 'success')
      }
      );
  }

  update():void{
    this.cinemaService.update(this.cinema)
    .subscribe( cinema => {
      this.router.navigate(['/cinemas'])
      swal('Boleto Actualizado', `Cinema ${cinema.nombre} actualizado con éxito!`, 'success')
    }

    )
  }
  
}
