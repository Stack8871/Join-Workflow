import { Component, OnInit, OnDestroy, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactService } from '../../services/contact.service';
import { ColorService } from '../../services/color.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';

import { Contact } from '../../interfaces/contact.interface';
import { AddContacts } from '../add-contacts/add-contacts';

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
  contacts: Contact[] = [];
  isAddOpen: WritableSignal<boolean> = signal(false);
  selectedContact: Contact | null = null;
  isMobile: WritableSignal<boolean> = signal(false);
  showMobileDetails: WritableSignal<boolean> = signal(false);

  private breakpointSubscription: Subscription;
  private contactsSubscription?: Subscription;

  constructor(
    private contactService: ContactService,
    private colorService: ColorService,
    private breakpointObserver: BreakpointObserver
  ) {
    this.breakpointSubscription = this.breakpointObserver
      .observe(['(max-width: 949px)'])
      .subscribe(result => this.isMobile.set(result.matches));
  }

  ngOnInit(): void {
    this.contactsSubscription = this.contactService.getContacts().subscribe((contactsFromDb) => {
      this.contacts = contactsFromDb;
      this.assignColorsToContacts();

      if (this.contacts.length > 0) {
        this.selectContact(this.contacts[0]);
      }
    });
  }

  ngOnDestroy(): void {
    this.breakpointSubscription.unsubscribe();
    this.contactsSubscription?.unsubscribe();
  }

  get mobileClass(): string {
    if (!this.isMobile()) {
      return 'desktop';
    }
    return this.showMobileDetails() ? 'mobile show-details' : 'mobile';
  }

  openPopup(): void {
    console.log('Overlay wird geöffnet!');
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
    return this.contacts.reduce((acc, contact) => {
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
}