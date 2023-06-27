import { Injectable } from '@angular/core';
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
  deleteDoc,
  getDocs,
  DocumentReference,
  QuerySnapshot,
} from '@angular/fire/firestore';
import { Turno } from '../interfaces/turno';
import { Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TurnoService {
  private turnosRef = collection(this.firestore, 'turnos');

  constructor(private firestore: Firestore) {}

  addTurnos(especialista: string, day: string, especialidad: string) {
    const horas = ['09','10','11','13','14','15','16','17'];
    const nameDay = new Date(day).toDateString().split(' ').splice(0, 1)[0];
    horas.forEach(hora  => {
      const turno = {
        especialista: especialista,
        especialidad: especialidad,
        paciente: null,
        nameDay: nameDay,
        fecha: `${day} ${hora}:00`,
        estado: 'libre',
        review: null,
        motivo: null,
        control: null,
      }
      this.addTurno(turno);
    })
  }

  addTurno(turno: Turno){
    this.addDocAuto(turno, this.turnosRef);
  }

  private addDocAuto(data: any, ref: CollectionReference<DocumentData>) {
    return addDoc(ref, data);
  }

  getTurnosByQuery(especialista: string, nameDay: string, especialidad: string){
    const q = query(this.turnosRef, where('especialista','==',especialista),where('nameDay', '==', nameDay), where('especialidad', '==', especialidad))
    return collectionData(q, {idField:'id'}) as Observable< Turno[] >;
  }

  getTurnosByField(fieldData: string, fieldName: string){
    const q = query(this.turnosRef, where(fieldName,'==', fieldData));
    return collectionData(q, {idField:'id'}) as Observable< Turno[] >;
  }

  getTurnosByDistinctEstado(estado: string){
    const q = query(this.turnosRef, where('estado','!=', estado));
    return collectionData(q, {idField:'id'}) as Observable< Turno[] >;
  }
  
  getTurnosRealizadosByField(fieldData: string, fieldName: string){
    const q = query(this.turnosRef, where(fieldName,'==', fieldData), where('estado','==', 'realizado'));
    return collectionData(q, {idField:'id'}) as Observable< Turno[] >;
  }
  
  getTurnosRealizadosByFieldPromise(fieldData: string, fieldName: string){
    const q = query(this.turnosRef, where(fieldName,'==', fieldData), where('estado','==', 'realizado'));
    return getDocs(q) as Promise<QuerySnapshot<Turno>>;
  }

  getTurnos(){
    return collectionData(this.turnosRef, {idField: 'id'}) as Observable< Turno[] >;
  }

  private deleteDoc(ref: DocumentReference<unknown>){
    return deleteDoc(ref);
  }

  deleteDocById(id: string){
    return this.deleteDoc(doc(this.turnosRef, id))
  }
  
  updateTurnoById(turno: Turno){
    return updateDoc(doc(this.turnosRef, turno.id), {...turno});
  }
}
