import {
  Firestore,
  collection,
  collectionData,
  doc,
  docData,
  setDoc,
  updateDoc,
  deleteDoc,
  addDoc,
  CollectionReference,
  DocumentReference,
  DocumentData,
  UpdateData
} from '@angular/fire/firestore';
import { inject, Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  private readonly firestore = inject(Firestore);
  private readonly ngZone = inject(NgZone);

  getAll<T extends { id?: string }>(collectionPath: string, idField?: string): Observable<T[]> {
    const ref = collection(this.firestore, collectionPath) as CollectionReference<T>;
    const options = idField ? { idField: idField as keyof T } : undefined;
    return collectionData(ref, options as any) as Observable<T[]>;
  }

  getById<T>(collectionPath: string, id: string): Observable<T> {
    const docRef = doc(this.firestore, collectionPath, id);
    return docData(docRef, { idField: 'id' }) as Observable<T>;
  }

  add<T>(collectionPath: string, data: T): Promise<DocumentReference<T>> {
    const col = collection(this.firestore, collectionPath) as CollectionReference<T>;
    return addDoc(col, data);
  }

  set<T>(collectionPath: string, id: string, data: T): Promise<void> {
    const ref = doc(this.firestore, collectionPath, id) as DocumentReference<T>;
    return setDoc(ref, data);
  }

  update<T>(collectionPath: string, id: string, data: UpdateData<T>): Promise<void> {
    const ref: DocumentReference<DocumentData> = doc(this.firestore, collectionPath, id);
    return updateDoc(ref, data as UpdateData<DocumentData>);
  }

  delete(collectionPath: string, id: string): Promise<void> {
    const ref = doc(this.firestore, collectionPath, id);
    return deleteDoc(ref);
  }
}