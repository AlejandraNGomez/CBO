import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DirectivaComponent } from './directiva/directiva.component';
import { CinemasComponent } from './cinemas/cinema.component';
import { CinemaService } from './cinemas/cinema.service';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormComponent } from './cinemas/form.component';
import { FormsModule } from '@angular/forms';
import { PeliculasComponent } from './cinemas/pelicula/pelicula.component';
import { PeliculaService } from './cinemas/pelicula/pelicula.service';
import { DetallePeliculaComponent } from './cinemas/detalle-pelicula/detalle-pelicula.component';
import { SalaComponent } from './cinemas/sala/sala.component';
import { SalaService } from './cinemas/sala/sala.service';
import { BoletoComponent } from './cinemas/boleto/boleto.component';
import { BoletoService } from './cinemas/boleto/boleto.service';
import { ConsultarBoletoComponent } from './cinemas/boleto/consultar-boleto/consultar-boleto.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: PeliculasComponent},
  //{path: 'directivas', component: DirectivaComponent},
  {path: 'cinemas', component: CinemasComponent},
  {path: 'cinemas/form', component: FormComponent},
  {path: 'cinemas/form/:id', component: FormComponent},
  {path: 'cinemas/detalle-pelicula/detalle-pelicula/:id', component: DetallePeliculaComponent},
  {path: 'cinemas/detalle-pelicula/detalle-pelicula', component: DetallePeliculaComponent},
  {path: 'cinemas/Boleto', component: BoletoComponent},
  {path: 'cinemas/ConsultaBoleto', component: ConsultarBoletoComponent}
]


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DirectivaComponent,
    CinemasComponent,
    FormComponent,
    PeliculasComponent,
    DetallePeliculaComponent,
    SalaComponent,
    BoletoComponent,
    ConsultarBoletoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    CinemaService,
    PeliculaService,
    SalaService,
    BoletoService    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
