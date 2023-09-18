import { Curso } from "./curso";

export interface Horario {
    dias: Array<Dia>
}

export interface Dia {
    id: string; //[ l, m, mi, j, v ]
    espacios: Array<Espacio>;

}


export interface Espacio {
    horaInicio;
    horaFin;
    curso: Curso;
}