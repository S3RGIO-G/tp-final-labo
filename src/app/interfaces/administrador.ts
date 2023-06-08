import { TypeUser } from "../enums/type-user";

export interface Administrador{
  id? : string;
  name : string;
  lastName:string;
  age: number;
  dni: number;
  email: string;
  password:string;
  images: Array<string>;
  type: TypeUser;
}