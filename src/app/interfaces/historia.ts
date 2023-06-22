export interface Historia{
  paciente:string;
  pacienteName: string, //Creo que no es necesario
  historial: [
    {
      fecha: string,
      especialista: string,
      altura: number,
      peso: number,
      temperatura: number,
      presion: number,
      dinamico:{
        clave:string,
        valor:number,
      }
    }
  ]
}