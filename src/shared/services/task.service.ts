import { inject, Injectable, NgZone } from '@angular/core';
import { Firestore, doc, updateDoc } from '@angular/fire/firestore';
import { Task } from '../interfaces/tasks.interface';
import { Subtasks } from '../interfaces/subtasks.interface';
import { from, Observable } from 'rxjs';
import { UiStateService } from './ui-state.service';
import { FirestoreService } from './firestore.service';

@Injectable({ providedIn: 'root' })
export class TaskService {
    private readonly firestoreService = inject(FirestoreService);
    private readonly firestore = inject(Firestore);

    private tasksRef = this.firestoreService.getAll<Task>('tasks');

  

    /*
    getTasks(): Observable<Task[]> {
        return this.firestoreService.getAll(this.tasksRef);
    }
    */

}