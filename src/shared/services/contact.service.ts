import { inject, Injectable, NgZone } from '@angular/core';
import { Firestore, doc, updateDoc } from '@angular/fire/firestore';
import { Contact } from '../interfaces/contact.interface';
import { from, Observable } from 'rxjs';
import { FirestoreService } from './firestore.service';

@Injectable({ providedIn: 'root' })
export class ContactService {
  private readonly ngZone = inject(NgZone);
  private readonly firestoreService = inject(FirestoreService);
  private readonly collectionPath = 'contacts';
  private readonly firestore = inject(Firestore);

  getContacts(): Observable<Contact[]> {
    return this.firestoreService.getAll<Contact>(this.collectionPath, 'id');
  }

  addContact(contact: Contact): Observable<void> {
    console.log('addContact called with', contact);
    return from(
      this.firestoreService.add<Contact>(this.collectionPath, contact).then(() => {
        console.log('Firestore add succeeded');
      }).catch(err => {
        console.error('Firestore add error:', err);
        throw err;
      })
    );
  }


  async updateContact(contact: Contact): Promise<void> {
    if (!contact.id) return;
    await this.ngZone.runOutsideAngular(async () => {
      const ref = doc(this.firestore, 'contacts', contact.id!);
      await updateDoc(ref, {
        name: contact.name,
        email: contact.email,
        phone: contact.phone || '',
        color: contact.color || ''
      });
      this.ngZone.run(() => {
        console.log('Contact updated in Angular context.');
      });
    });
  }

  deleteContact(contactId: string): Observable<void> {
    return from(new Promise<void>((resolve, reject) => {
      this.ngZone.run(() => {
        this.firestoreService.delete(this.collectionPath, contactId)
          .then(resolve)
          .catch(reject);
      });
    }));
  }

  getContactById(id: string): Observable<Contact> {
    return new Observable<Contact>((observer) => {
      this.ngZone.run(() => {
        this.firestoreService.getById<Contact>(this.collectionPath, id).subscribe({
          next: (contact) => observer.next(contact),
          error: (err) => observer.error(err),
          complete: () => observer.complete()
        });
      });
    });
  }


}