import { Injectable } from '@angular/core';
import { FirestoreService } from './firestore.service';
import { Contact } from '../interfaces/contact.interface';
import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class ContactService {
  private readonly collectionName = 'contacts';

  constructor(private firestoreService: FirestoreService) {}

  getContacts(): Observable<Contact[]> {
    return this.firestoreService.getCollection<Contact>(this.collectionName);
  }

  getContact(id: string): Observable<Contact> {
    return this.firestoreService.getDocument<Contact>(this.collectionName, id);
  }

  addContact(contact: Contact) {
    return this.firestoreService.addDocument<Contact>(this.collectionName, contact);
  }

  updateContact(id: string, contact: Partial<Contact>) {
    return this.firestoreService.updateDocument<Contact>(this.collectionName, id, contact);
  }

  deleteContact(id: string) {
    return this.firestoreService.deleteDocument(this.collectionName, id);
  }
}
