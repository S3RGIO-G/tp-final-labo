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
  Query,
} from '@angular/fire/firestore';
import { Log } from '../interfaces/log';
import { Observable } from 'rxjs';
import { Administrador } from '../interfaces/administrador';
import { Especialista } from '../interfaces/especialista';
import { Paciente } from '../interfaces/paciente';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  private logsRef = collection(this.firestore, 'logs');
  constructor(private firestore: Firestore) { }

  private addDocAuto(data: any, ref: CollectionReference<DocumentData>) {
    return addDoc(ref, data);
  }

  private getDocsObserver(
    ref: CollectionReference<DocumentData> | Query<DocumentData>
  ) {
    return collectionData(ref, { idField: 'id' });
  }

  private addLog(log: Log) {
    return this.addDocAuto(log, this.logsRef);
  }

  addLogFromUser({id , name , lastName} : any){
    const now = new Date(Date.now());
    const day = now.toLocaleDateString().split('/').reverse().join('/');
    const hour = now.toLocaleTimeString();

    const log : Log = {
      user : id,
      nameUser : name,
      lastNameUser: lastName,
      day : day,
      hour: hour,
    }

    return this.addLog(log);
  }

  getLogs(){
    return this.getDocsObserver(this.logsRef) as Observable<Log[]>
  }
}
