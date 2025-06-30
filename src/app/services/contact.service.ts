import { inject, Injectable, NgZone } from '@angular/core';
import { Firestore, collection, collectionData, doc, updateDoc, deleteDoc, addDoc, CollectionReference, DocumentData } from '@angular/fire/firestore';
import { Contact } from '../interfaces/contact.interface';
import { from, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ContactService {
  private readonly firestore: Firestore = inject(Firestore);
  private readonly ngZone: NgZone = inject(NgZone);
  private readonly contactsRef: CollectionReference<DocumentData> = collection(this.firestore, 'contacts');

  getContacts(): Observable<Contact[]> {
    return collectionData(this.contactsRef, { idField: 'id' }) as Observable<Contact[]>;
  }

  addContact(contact: Contact): Observable<void> {
    return from(
      new Promise<void>((resolve, reject) => {
        this.ngZone.run(() => {
          addDoc(this.contactsRef, contact)
            .then(() => resolve())
            .catch(reject);
        });
      })
    );
  }

  updateContact(contact: Contact): Observable<void> {
    if (!contact.id) return from(Promise.resolve());
    const docRef = doc(this.firestore, `contacts/${contact.id}`);
    return from(
      new Promise<void>((resolve, reject) => {
        this.ngZone.run(() => {
          updateDoc(docRef, {
            name: contact.name,
            email: contact.email,
            phone: contact.phone || '',
            color: contact.color || '',
          })
            .then(() => resolve())
            .catch(reject);
        });
      })
    );
  }

  deleteContact(contactId: string): Observable<void> {
    const docRef = doc(this.firestore, `contacts/${contactId}`);
    return from(
      new Promise<void>((resolve, reject) => {
        this.ngZone.run(() => {
          deleteDoc(docRef)
            .then(() => resolve())
            .catch(reject);
        });
      })
    );
  }
}