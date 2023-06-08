import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
  sendEmailVerification,
} from '@angular/fire/auth';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  CollectionReference,
  DocumentData,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  query,
  where,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Administrador } from '../interfaces/administrador';
import { Paciente } from '../interfaces/paciente';
import { Especialista } from '../interfaces/especialista';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  usersRef = collection(this.firestore, 'users');
  especialistasRef = collection(this.firestore, 'especialistas');
  adminsRef = collection(this.firestore, 'admins');
  specialtiesRef = collection(this.firestore, 'especialidades');
  currentAuth = this.auth;

  constructor(private auth: Auth, private firestore: Firestore) {}

  getCurrentUser() : Administrador | Paciente | Especialista | null{
    let user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
  setCurrentUser(user: Administrador | Paciente | Especialista){
    localStorage.setItem('user', JSON.stringify(user));
  }

  //** AUTH **

  register({ email, password }: any) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  login({ email, password }: any) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    return signOut(this.auth);
  }

  sendEmailVerification(user: User) {
    return sendEmailVerification(user);
  }

  //** FIRESTORE **
  addDocAuto(data: any, ref: CollectionReference<DocumentData>) {
    return addDoc(ref, data);
  }
  private addDocById(
    user: Administrador | Paciente | Especialista,
    id: string
  ) {
    return setDoc(doc(this.usersRef, id), user);
  }

  addUserById(
    {
      type,
      name,
      lastName,
      age,
      dni,
      obraSocial,
      especialidad,
      email,
      password,
      imgURLs,
    }: any,
    id: string
  ) {
    const user = {
      type: parseInt(type),
      name,
      lastName,
      age: parseInt(age),
      dni: parseInt(dni),
      email,
      password,
      images: imgURLs,
    };
    switch (type) {
      case '2':
        return this.addDocById({ ...user, especialidad, valid: false }, id);
      case '3':
        return this.addDocById({ ...user, obraSocial }, id);
      default:
        return this.addDocById(user, id);
    }
  }

  addSpecialty(specialty: any) {
    return this.addDocAuto(specialty, this.specialtiesRef);
  }

  getDocsObserver(
    ref: CollectionReference<DocumentData>
  ): Observable<Administrador[] | Paciente[] | Especialista[]> {
    return collectionData(ref, { idField: 'id' }) as Observable<
      Administrador[] | Paciente[] | Especialista[]
    >;
  }

  getUsers() {
    return this.getDocsObserver(this.usersRef);
  }

  getUserById(id: string) {
    return getDoc(doc(this.usersRef, id));
  }
  getUsersDistinctType(type: number) : Observable<Paciente[] | Especialista[]> {
    const q = query(this.usersRef, where('type', '!=', type));    
    return collectionData(q, { idField: 'id' }) as Observable<Paciente[] | Especialista[]>;
  }

  getUsersByType(type: number) : Observable<Paciente[] | Especialista[]> {
    const q = query(this.usersRef, where('type', '==', type));    
    return collectionData(q, { idField: 'id' }) as Observable<Paciente[] | Especialista[]>;
  }

  getSpecialties(): Observable<any[]> {
    return collectionData(this.specialtiesRef, { idField: 'id' }) as Observable<
      any[]
    >;
  }

  updateUser(user : Administrador | Paciente | Especialista){
    return updateDoc(doc(this.usersRef, user.id), {...user});
  }
}
