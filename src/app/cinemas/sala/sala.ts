import { Cinema } from "../cinema";
import { Pelicula } from "../pelicula/pelicula";

export class Sala {
    id: number;
    numero: number;
    cantSillas: number;
    pelicula: Pelicula;
    cinema: Cinema;
}