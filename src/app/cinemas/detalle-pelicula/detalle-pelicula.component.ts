import { Component, OnInit } from '@angular/core';

declare var ol: any;
import { Pelicula } from '../pelicula/pelicula';
import { PeliculaService } from '../pelicula/pelicula.service';
import { Router,ActivatedRoute } from '@angular/router'
import { CinemaService } from '../cinema.service';
import { SalaService } from '../sala/sala.service';


@Component({
  selector: 'app-detalle-peliculas',
  templateUrl: './detalle-pelicula.component.html'
})
export class DetallePeliculaComponent implements OnInit {

  public peliculas: Pelicula = new Pelicula();
  public titulo: string = "Detalle Película";
  public  map;
  constructor(private peliculaService:PeliculaService, private cinemaService: CinemaService, private salaService: SalaService,
              private router: Router, private activatedRoute: ActivatedRoute) { }

  latitude: number ;
  longitude: number;

  ngOnInit(): void {
    this.cargarPelicula();
    
  }
  
  cargarPelicula(): void{
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if(id){
        this.peliculaService.getPelicula(id).subscribe(
          (peliculas) => {
            this.peliculas = peliculas;
            
            this.cinemaService.getCinema(this.peliculas.cinema.id).subscribe(
                (cinema) => {
                  this.peliculas.cinema = cinema;
                  this.longitude = parseFloat(cinema.longitud);
                  this.latitude = parseFloat(cinema.latitud);
                  console.log('nom: '+this.latitude);
                  console.log('nom: '+this.longitude);
                  this.map = new ol.Map({
                    target: 'map',
                    layers: [
                      new ol.layer.Tile({
                        source: new ol.source.OSM()
                      })
                    ],
                    view: new ol.View({
                      center: ol.proj.fromLonLat([this.longitude, this.latitude]),
                      zoom: 12
                    })
                  });
                  console.log('latitude: '+this.latitude);
                  console.log('longitude: '+this.longitude);
                  this.addPoint(this.latitude, this.longitude);
                }
              );
              
            this.salaService.getSalas(this.peliculas.sala.id).subscribe(
                (sala) => {
                  console.log(sala);
                  this.peliculas.sala = sala;
                }
            );
          })
      }
    })
    
  }

  setCenter() {
    var view = this.map.getView();
    view.setCenter(ol.proj.fromLonLat([this.longitude, this.latitude]));
    view.addMarker(ol.proj.fromLonLat([this.longitude, this.latitude]));
    view.setZoom(12);
  }

  addPoint(lat: number, lng: number) {
    var vectorLayer = new ol.layer.Vector({
      source: new ol.source.Vector({
        features: [new ol.Feature({
          geometry: new ol.geom.Point(ol.proj.transform([lng, lat], 'EPSG:4326', 'EPSG:3857')),
        })]
      }),
      style: new ol.style.Style({
        image: new ol.style.Icon({
          src: 'https://openlayers.org/en/v3.20.1/examples/data/icon.png'
        })
      })

    });
    this.map.addLayer(vectorLayer);
    }
}

  