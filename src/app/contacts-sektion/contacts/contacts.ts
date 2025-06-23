import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact-service';
import { CommonModule } from '@angular/common';

interface Contact {
  name: string;
  email: string;
  phone: string;
}

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contacts.html',
  styleUrl: './contacts.scss'
})
export class Contacts implements OnInit {
  constructor(private contactService: ContactService) {}
  selectedContact: Contact | null = null;

  ngOnInit(): void {
    // Select the first contact by default if contacts exist
    if (this.contacts.length > 0) {
      this.selectContact(this.contacts[0]);
    }
  }

  addContact(): void {
    this.contactService.triggerAddContact();
  }

  selectContact(contact: Contact): void {
    this.selectedContact = contact;
  }
  contacts: Contact[] = [
    {
      name: 'Anja Schulz',
      email: 'schulz@hotmail.com',
      phone: '+49 151 12345678',
    },
    {
      name: 'Benedikt Ziegler',
      email: 'benedikt@gmail.com',
      phone: '+49 171 98765432',
    },
    {
      name: 'David Eisenberg',
      email: 'davidberg@gmail.com',
      phone: '+49 160 1112233',
    },
    {
      name: 'Eva Fischer',
      email: 'eva@gmail.com',
      phone: '+49 172 3344556',
    },
    {
      name: 'Emmanuel Mauer',
      email: 'emmanuelma@gmail.com',
      phone: '+49 152 7788990',
    },
    {
      name: 'Marcel Bauer',
      email: 'bauer@gmail.com',
      phone: '+49 176 99887766',
    },
  ];
  get groupedContacts(): Record<string, Contact[]> {
    return this.contacts.reduce((acc, contact) => {
      const letter = contact.name.charAt(0).toUpperCase();
      acc[letter] = acc[letter] || [];
      acc[letter].push(contact);
      return acc;
    }, {} as Record<string, Contact[]>);
  }
  getInitials(name: string): string {
    return name?.trim()?.charAt(0)?.toUpperCase() ?? '';
  }
}
