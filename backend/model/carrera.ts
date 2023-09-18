import { Curso } from "./curso";

export interface Carrera {
    carrera: string;
    cursos: Array<Curso>;
}