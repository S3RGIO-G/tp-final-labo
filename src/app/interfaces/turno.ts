export interface Turno {
  id?: string;
  especialista: string;
  especialidad: string;
  paciente: null | string;
  nameDay: string;
  fecha: string;
  estado: string; //Libre, Pendiente, Aceptado, Cancelado, Rechazado, Realizado
  review: null | {
    comentario: string;
    puntuacion: number;
  };
  motivo:string | null;
}
