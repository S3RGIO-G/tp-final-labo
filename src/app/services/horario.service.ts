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
} from '@angular/fire/firestore';
import { Horario } from '../interfaces/horario';
import { Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HorarioService {
  private horariosRef = collection(this.firestore, 'horarios');
  
  constructor(private firestore: Firestore) { }

  addHorario(horario : Horario){
    return addDoc(this.horariosRef, horario);
  }

  addHorarioDefault(id: string, especialidades : string[]){
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
    const horario = {
      user: id,
      especialidades:[] as any[],
    }

    especialidades.forEach(item => {
      const esp = {
        name: item,
        days : [] as any[],
      }
      days.forEach(day => {
        esp.days.push({day, valid : false, turnos : []})
      })
      horario.especialidades.push(esp);
    })

    return this.addHorario(horario);
  }

  getHorarios(especialista:string){
    const q = query(this.horariosRef, where('user', '==', especialista));
    return collectionData(q, {idField:'id'}) as Observable<Horario[]>;
  }

  updateHorario(horario: Horario) {
    return updateDoc(doc(this.horariosRef, horario.id), { ...horario });
  }
}
