import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UiStateService {
  private readonly _openOverlay$ = new BehaviorSubject<string | null>(null);

  get openOverlay$(): Observable<string | null> {
    return this._openOverlay$.asObservable();
  }

    openOverlay(name: string): void {
    console.log('openOverlay called with', name);
    this._openOverlay$.next(name);
    }

  closeOverlay(): void {
    this._openOverlay$.next(null);
  }

  isOverlayOpen(name: string): Observable<boolean> {
    return this._openOverlay$.pipe(map(open => open === name));
  }
}