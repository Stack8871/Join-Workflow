import { inject, Injectable, signal } from '@angular/core';
import { Firestore, 
        collection, 
        doc, 
        addDoc, 
        updateDoc, 
        deleteDoc, 
        getDoc, 
        getDocs, 
        CollectionReference, 
        DocumentReference, 
        setDoc} from '@angular/fire/firestore';
import { DocumentData, WithFieldValue } from '@angular/fire/firestore';        
import { collectionData, docData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Contact } from '../interfaces/contact.interface';

@Injectable({ providedIn: 'root' })
export class FirestoreService {
  private firestore = inject(Firestore);

  contacts = collectionSignals<Contact>(
    collection(this.firestore, 'contacts') as CollectionReference<Contact>,
    { idField: 'id' }
  );

    getContactById(id: string) {
        const docRef = doc(this.firestore, `contacts/${id}`);
        return docSignals<Contact>(docRef);
    }

     addContact(contact: Contact) {
    const ref = collection(this.firestore, 'contacts');
    return addDoc(ref, contact);
    }

    async updateContact(contact: Contact) {
        if (!contact.id) return;
        const ref = doc(this.firestore, `contacts/${contact.id}`);
        await setDoc(ref, contact);
    }

    async deleteContact(id: string) {
        const ref = doc(this.firestore, `contacts/${id}`);
        await deleteDoc(ref);
    }
}

    function collectionSignals<T>(contactsCollection: CollectionReference<DocumentData, DocumentData>, arg1: { idField: string; }) {
        throw new Error('Function not implemented.');
    }
    function docSignals<T>(docRef: DocumentReference<DocumentData, DocumentData>) {
        throw new Error('Function not implemented.');
    }

