export interface Control {
  altura: number;
  peso: number;
  temperatura: number;
  presion: number;
  dinamico: null | [
    {
      clave: string; //Caries, Lentes, Glocosa
      valor: any;
    }
  ];
}
