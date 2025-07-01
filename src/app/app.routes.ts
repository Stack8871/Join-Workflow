import { Routes } from '@angular/router';
import { MainPage } from './main-page/main-page';
import { ManageTask } from './board/manage-task/manage-task';
import { Contacts } from './contacts-sektion/contacts/contacts';

export const routes: Routes = [
  { path: '', component: MainPage },
  { path: 'board', component: ManageTask },
  { path: 'contacts', component: Contacts },
  { path: '**', redirectTo: '' }
];
