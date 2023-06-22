export interface Historia{
  paciente:string;
  pacienteName: string, //Creo que no es necesario
  historial: [
    {
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