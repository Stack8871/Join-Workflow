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

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  private contactsCollection: CollectionReference<Contact>;

  constructor(private firestore: Firestore) {
    this.contactsCollection = collection(this.firestore, 'contacts') as CollectionReference<Contact>;
  }

  getContacts(): Observable<Contact[]> {
    return collectionData(this.contactsCollection, { idField: 'id' }) as Observable<Contact[]>;
  }

  getContactById(id: string): Observable<Contact | undefined> {
    const docRef: DocumentReference<Contact> = doc(this.contactsCollection, id);
    return docData(docRef, { idField: 'id' }) as Observable<Contact | undefined>;
  }

  addContact(contact: Contact): Promise<DocumentReference<Contact>> {
    return addDoc(this.contactsCollection, contact);
  }

  updateContact(contact: Contact): Promise<void> {
    if (!contact.id) return Promise.reject('Contact ID is missing');

    const docRef: DocumentReference<Contact> = doc(this.contactsCollection, contact.id);
    return updateDoc(docRef, {
      name: contact.name,
      email: contact.email,
      phone: contact.phone ?? '',
      color: contact.color ?? ''
    });
  }

  deleteContact(id: string): Promise<void> {
    const docRef: DocumentReference<Contact> = doc(this.contactsCollection, id);
    return deleteDoc(docRef);
  }
}