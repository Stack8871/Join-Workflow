import { Injectable, inject } from '@angular/core';
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
  DocumentReference
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  private firestore = inject(Firestore);


  getBoards(): Observable<any[]> {
    const boardsRef = collection(this.firestore, 'boards');
    return collectionData(boardsRef, { idField: 'id' });
  }

  getBoard(boardId: string): Observable<any> {
    const boardRef = doc(this.firestore, `boards/${boardId}`);
    return docData(boardRef, { idField: 'id' });
  }

  addBoard(data: any): Promise<DocumentReference> {
    const boardsRef = collection(this.firestore, 'boards');
    return addDoc(boardsRef, data);
  }

  updateBoard(boardId: string, data: any): Promise<void> {
    const boardRef = doc(this.firestore, `boards/${boardId}`);
    return updateDoc(boardRef, data);
  }

  deleteBoard(boardId: string): Promise<void> {
    const boardRef = doc(this.firestore, `boards/${boardId}`);
    return deleteDoc(boardRef);
  }
}