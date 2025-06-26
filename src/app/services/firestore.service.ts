import { Injectable } from '@angular/core';
import { Firestore, 
        collection, 
        doc, 
        addDoc, 
        updateDoc, 
        deleteDoc, 
        getDoc, 
        getDocs, 
        CollectionReference, 
        DocumentReference } from '@angular/fire/firestore';
import { DocumentData, WithFieldValue } from '@angular/fire/firestore';        
import { collectionData, docData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FirestoreService {
    constructor(private firestore: Firestore) {}

    getCollection<T>(collectionName: string): Observable<T[]> {
    const collRef = collection(this.firestore, collectionName);
    return collectionData(collRef, { idField: 'id' }) as Observable<T[]>;
    }

    getDocument<T>(collectionName: string, id: string): Observable<T> {
        const docRef = doc(this.firestore, collectionName, id);
        return docData(docRef, { idField: 'id' }) as Observable<T>;
    }

    addDocument<T extends WithFieldValue<DocumentData>>(collectionName: string, data: T): Promise<DocumentReference> {
        const collRef = collection(this.firestore, collectionName);
        return addDoc(collRef, data);
    }

    updateDocument<T>(collectionName: string, id: string, data: Partial<T>): Promise<void> {
        const docRef = doc(this.firestore, collectionName, id);
        return updateDoc(docRef, data);
    }

    deleteDocument(collectionName: string, id: string): Promise<void> {
        const docRef = doc(this.firestore, collectionName, id);
        return deleteDoc(docRef);
    }
}