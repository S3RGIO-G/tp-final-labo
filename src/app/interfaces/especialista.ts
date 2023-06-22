import { TypeUser } from "../enums/type-user";

export interface Especialista{
  id? : string;
  name : string;
  lastName:string;
  age: number;
  dni: number;
  email: string;
  password:string;
  images: Array<string>;
  especialidad: Array<string>;
  type: TypeUser;
  valid: boolean;
  emailVerified: boolean;
}