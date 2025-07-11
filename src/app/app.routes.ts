import { Routes } from '@angular/router';
import { MainPage } from './main-page/main-page';
import { ManageTask } from './board/manage-task/manage-task';
import { Contacts } from './contacts-sektion/contacts/contacts';
import { Login } from './login/login';
import { summary } from './summary/summary';
import { AddTask } from './board/add-task/add-task';
import { TaskDetail } from './board/task-detail/task-detail';

export const routes: Routes = [
  { path: '', component: MainPage },
  { path: 'board', component: ManageTask },
  { path: 'contacts', component: Contacts },
  { path: 'summary', component:summary},
    { path: 'login', component: TaskDetail },
  { path: 'add-task', component: AddTask },
  { path: '**', redirectTo: '' }
];
