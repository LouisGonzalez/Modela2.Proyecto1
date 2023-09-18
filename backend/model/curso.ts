
import { Carrera } from './Carrera';
import { Catedratico } from './catedratico';

export interface Curso {
  nombre: string;
//  carrera: Carrera;
  semestre?: number;
  catedratico?: Catedratico;
  asignados: number;
}