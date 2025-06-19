import { Component, ViewChild } from '@angular/core';
import { Contacts } from '../contacts-sektion/contacts/contacts';
import { AddContacts } from '../contacts-sektion/add-contacts/add-contacts';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [CommonModule, Contacts, AddContacts],
  templateUrl: './main-page.html',
  styleUrl: './main-page.scss'
})
export class MainPage {


}
