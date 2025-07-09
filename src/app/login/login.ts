import { Component } from '@angular/core';
import { EditTask } from '../board/edit-task/edit-task';

@Component({
  selector: 'app-login',
  imports: [EditTask],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {

}
