import { inject, Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, updateDoc, deleteDoc, addDoc } from '@angular/fire/firestore';
import { Contact } from '../interfaces/contact.interface';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ContactService {
  private firestore: Firestore = inject(Firestore);
  private contactsRef = collection(this.firestore, 'contacts');

  getContacts(): Observable<Contact[]> {
    return collectionData(this.contactsRef, { idField: 'id' }) as Observable<Contact[]>;
  }

  addContact(contact: Contact) {
    return addDoc(this.contactsRef, contact);
  }

  updateContact(contact: Contact): void {
    if (!contact.id) return;
    const docRef = doc(this.firestore, `contacts/${contact.id}`);
    updateDoc(docRef, {
      name: contact.name,
      email: contact.email,
      phone: contact.phone || '',
      color: contact.color || '',
    });
  }

  deleteContact(contactId: string): void {
    const docRef = doc(this.firestore, `contacts/${contactId}`);
    deleteDoc(docRef);
  }
}
