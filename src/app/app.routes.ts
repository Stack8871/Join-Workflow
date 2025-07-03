import { Routes } from '@angular/router';
import { MainPage } from './main-page/main-page';
import { ManageTask } from './board/manage-task/manage-task';
import { Contacts } from './contacts-sektion/contacts/contacts';
import { Login } from './login/login';

export const routes: Routes = [
  { path: '', component: MainPage },
  { path: 'board', component: ManageTask },
  { path: 'contacts', component: Contacts },
    { path: 'login', component: Login },
  { path: '**', redirectTo: '' }
];
