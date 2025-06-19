import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './Sidebar/header/header';
import { SectionSidebar } from './Sidebar/section-sidebar/section-sidebar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, Header, SectionSidebar],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'join';
}
