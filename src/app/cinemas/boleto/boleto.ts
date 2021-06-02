import { Cinema } from "../cinema";
import { Pelicula } from "../pelicula/pelicula";
import { Sala } from "../sala/sala";

export class Boleto{
    id: number;
    cedulaCliente: number;
    pelicula:Pelicula;
    sala: Sala;
    cinema: Cinema;
    sillas: string;
}
