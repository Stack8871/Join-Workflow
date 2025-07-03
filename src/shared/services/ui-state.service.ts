import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UiStateService {
  private readonly _openOverlay$ = new BehaviorSubject<string | null>(null);

  get openOverlay$(): Observable<string | null> {
    return this._openOverlay$.asObservable();
  }

    openOverlay(name: string): void {
        this._openOverlay$.next(name);
    }

  closeOverlay(): void {
    this._openOverlay$.next(null);
  }

  cancelOverlay(): void {}

  isOverlayOpen(name: string): Observable<boolean> {
    return this._openOverlay$.pipe(map(open => open === name));
  }

    closeOverlayIfOpen(name: string): void {
        this._openOverlay$.pipe(
            map(open => open === name)
        ).subscribe(isOpen => {
            if (isOpen) {
            this.closeOverlay();
            }
        }).unsubscribe(); 
    }

}