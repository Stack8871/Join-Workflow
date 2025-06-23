// src/app/contacts/contacts.component.ts
import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact-service';
import { CommonModule } from '@angular/common';
import { ColorService } from '../../shared/services/color.service';

interface Contact {
  name: string;
  email: string;
  phone: string;
  color?: string;
}

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contacts.html',
  styleUrls: ['./contacts.scss']
})
export class Contacts implements OnInit {
  contacts: Contact[] = [
    { name: 'Anja Schulz', email: 'schulz@hotmail.com', phone: '+49 151 12345678' },
    { name: 'Benedikt Ziegler', email: 'benedikt@gmail.com', phone: '+49 171 98765432' },
    { name: 'Bernd Mörse', email: 'bernd@gmail.com', phone: '+49 171 98765432' },
    { name: 'David Eisenberg', email: 'davidberg@gmail.com', phone: '+49 160 1112233' },
    { name: 'Eva Fischer',   email: 'eva@gmail.com',       phone: '+49 172 3344556' },
    { name: 'Emmanuel Mauer',email: 'emmanuelma@gmail.com',phone: '+49 152 7788990' },
    { name: 'Marcel Bauer',  email: 'bauer@gmail.com',     phone: '+49 176 99887766' },
    { name: 'Frank Bauer',  email: 'bauer@gmail.com',     phone: '+49 176 99887766' }
  ];
  selectedContact: Contact | null = null;

  constructor(
    private contactService: ContactService,
    private colorService: ColorService
  ) {}

  ngOnInit(): void {
    this.assignColorsToContacts();
    if (this.contacts.length > 0) {
      this.selectContact(this.contacts[0]);
    }
  }

  private assignColorsToContacts(): void {
    this.contacts.forEach(contact => {
      contact.color = this.colorService.generateColorByString(contact.name);
    });
  }

  addContact(): void {
    this.contactService.triggerAddContact();
  }

  selectContact(contact: Contact): void {
    this.selectedContact = contact;
  }

  get groupedContacts(): Record<string, Contact[]> {
    return this.contacts.reduce((acc, contact) => {
      const letter = contact.name.charAt(0).toUpperCase();
      (acc[letter] ||= []).push(contact);
      return acc;
    }, {} as Record<string, Contact[]>);
  }

  getInitials(name: string): string {
    return name.trim().charAt(0).toUpperCase();
  }

  getContactColor(contact: Contact): string {
    if (!contact.color) {
      contact.color = this.colorService.generateColorByString(contact.name);
    }
    return contact.color;
  }
}
