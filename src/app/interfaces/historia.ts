import { Control } from "./control";

export interface Historia{
  paciente:string;
  pacienteName: string, //Creo que no es necesario
  historial: [
    {
      fecha: string,
      especialista: string,
      especialidad: string, 
      review: null | {
        comentario: string;
        puntuacion: number;
      }, 
      control: Control;
    }
  ]
}