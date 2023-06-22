export interface HorarioEsp {
  name: string;
  days: [
    {
      day: 'Mon';
      valid: boolean;
      turnos: Array<string>;
    },
    {
      day: 'Tue';
      valid: boolean;
      turnos: Array<string>;
    },
    {
      day: 'Wed';
      valid: boolean;
      turnos: Array<string>;
    },
    {
      day: 'Thu';
      valid: boolean;
      turnos: Array<string>;
    },
    {
      day: 'Fri';
      valid: boolean;
      turnos: Array<string>;
    }
  ];
}
