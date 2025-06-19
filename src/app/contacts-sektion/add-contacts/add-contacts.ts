import { Component, OnDestroy, signal, WritableSignal } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ContactService } from '../contact-service';

@Component({
  selector: 'app-add-contacts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-contacts.html',
  styleUrls: ['./add-contacts.scss']
})
export class AddContacts implements OnDestroy {

  isMobile: WritableSignal<boolean> = signal(false);
  private breakpointSubscription: Subscription;
  private contactServiceSubscription: Subscription;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private contactService: ContactService
  ) {
    this.breakpointSubscription = this.breakpointObserver
        .observe(['(max-width: 949px)'])
        .subscribe(result => this.isMobile.set(result.matches));

    // Subscribe to the contact service to open the popup when the add contact button is clicked
    this.contactServiceSubscription = this.contactService.addContactClick$.subscribe(() => {
      this.openPopup();
    });
  }

  get mobileClass(): string {
    return this.isMobile() ? 'mobile' : 'desktop';
  }

  ngOnDestroy(): void {
    this.breakpointSubscription.unsubscribe();
    this.contactServiceSubscription.unsubscribe();
  }


  // ✅ Popup-Zustand
  isOpen = false;

  openPopup(): void {
    this.isOpen = true;
  }

  closePopup(): void {
    this.isOpen = false;
  }


}
