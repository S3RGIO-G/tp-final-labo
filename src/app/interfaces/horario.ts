import { HorarioEsp } from "./horarioEsp";

export interface Horario{
  id?: string;
  user: string;
  especialidades: HorarioEsp[];
}