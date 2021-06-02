import { Cinema } from "../cinema";
import { Sala } from "../sala/sala";

export class Pelicula {
    id: number;
    nombre: string;
    cinema: Cinema;
    caratula: string;
    descripcion: string;
    categoria: string;
    sala: Sala;
}