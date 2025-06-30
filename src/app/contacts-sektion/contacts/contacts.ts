import { Component, OnInit, OnDestroy, signal, WritableSignal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactService } from '../../services/contact.service';
import { ColorService } from '../../services/color.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Observable, Subject, Subscription } from 'rxjs';

import { Contact } from '../../interfaces/contact.interface';
import { FirestoreService } from '../../services/firestore.service';
import { AddContacts } from '../add-contacts/add-contacts';
import { collection, Firestore, updateDoc } from 'firebase/firestore';
import { collectionData } from '@angular/fire/firestore';
import { FormBuilder, FormGroup } from '@angular/forms';
import { get } from 'firebase/database';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [
    CommonModule,
    AddContacts],
  templateUrl: './contacts.html',
  styleUrl: './contacts.scss'
})

export class Contacts implements OnInit, OnDestroy {
  contacts$: Observable<Contact[]>;

  contactForm!: FormGroup;

  isAddOpen: WritableSignal<boolean> = signal(false);
  selectedContact: Contact | null = null;
  isMobile: WritableSignal<boolean> = signal(false);
  showMobileDetails: WritableSignal<boolean> = signal(false);

  private destroy$ = new Subject<void>();
  private breakpointSubscription: Subscription;

  constructor(
    private firestore: Firestore, 
    private fb: FormBuilder,
    private contactsService: ContactService,
    private colorService: ColorService,
    private breakpointObserver: BreakpointObserver
  ) {
    const contactsRef = collection(this.firestore, 'contacts');
    this.contacts$ = collectionData(contactsRef, { idField: 'id' }) as Observable<Contact[]>;

    this.breakpointSubscription = this.breakpointObserver
      .observe(['(max-width: 949px)'])
      .subscribe(result => this.isMobile.set(result.matches));
    }
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  }

  ngOnInit(): void {
    this.initForm();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.breakpointSubscription.unsubscribe();
  }

  initForm(): void {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      color: ['']
    });
  }

  get mobileClass(): string {
    if (!this.isMobile()) {
      return 'desktop';
    }
    return this.showMobileDetails() ? 'mobile show-details' : 'mobile';
  }

  openPopup(): void {
    this.isAddOpen.set(true);
  }

  selectContact(contact: Contact): void {
    this.selectedContact = contact;
    if (this.isMobile()) {
      this.showMobileDetails.set(true);
    }
  }

  closeContactDetails(): void {
    this.showMobileDetails.set(false);
  }

  get groupedContacts(): Record<string, Contact[]> {
    const raw = this.contacts();
    return raw.reduce((acc, contact) => {
      const letter = contact.name.charAt(0).toUpperCase();
      (acc[letter] ||= []).push(contact);
      return acc;
    }, {} as Record<string, Contact[]>);
  }

  getInitials(name: string): string {
    const nameParts = name.trim().split(' ');
    if (nameParts.length === 1) {
      return nameParts[0].charAt(0).toUpperCase();
    }
    const firstName = nameParts[0];
    const lastName = nameParts[nameParts.length - 1];
    return (firstName.charAt(0) + lastName.charAt(0)).toUpperCase();
  }

  getContactColor(contact: Contact): string {
    return this.colorService.generateColorByString(contact.name);
  }

  private assignColorsToContacts(): void {
    this.contacts.forEach(contact => {
      contact.color = this.colorService.generateColorByString(contact.name);
    });
  }

  updateDoc(contact: Contact) void {
    if (!contact.id) return;

    const docRef = doc(this.firestore, `contacts/${contact.id}`);
    updateDoc(docRef, {
      name: contact.name,
      email: contact.email,
      phone: contact.phone || '',
      color: contact.color || ''
    });
  }

  deleteContact(id: string): void {
    this.contactsService.deleteContact(id);
  }

  saveContact(): void {
    if (this.contactForm.invalid) return;
    const contact: Contact = this.contactForm.value;
    this.contactsService.addContact(contact);
    this.contactForm.reset();
    this.isAddOpen.set(false);
  }

  deleteContact(contactId: string) {
    const docRef = doc(this.firestore, `contacts/${id}`);
    deleteDoc(docRef);
  }

  ngOnInit(): void {
    this.initForm();
    this.contactsService.loadContacts()
  }

  initForm(): void {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      color: ['']
    });
  }

  ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();
    }

}