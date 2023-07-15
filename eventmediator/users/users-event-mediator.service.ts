import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { UsersFormData } from './form/form.component';

export interface User {
  name: string;
  description: string;
  person: string;
  listOfTasks: string[];
  done: boolean;
}

@Injectable()
export class UsersEventMediatorService {
  private formChanged$= new Subject<UsersFormData<string>>();
  private listChanged$= new Subject<any>();
  private user!: User;
  private editMode = false;

  getUser(): User {
    if (!this.user) {
      this.user = {
        name: '',
        description: '',
        person: '',
        listOfTasks: [],
        done: false,
      }
    }

    return this.user;
  }

  isEditMode() {
    return this.editMode;
  }

  setEditMode(state: boolean) {
    this.editMode = state;
  }

  get formChanged() {
    return this.formChanged$.asObservable();
  }

  get listChanged() {
    return this.listChanged$.asObservable();
  }

  notifyOnFormChanged(formData: UsersFormData<string>) {
    this.formChanged$.next(formData);
    this.setUser(formData);
  }

  notifyOnListChanged(list: any) {
    this.listChanged$.next(list);
  }

  setUser(user: Partial<User>) {
    this.user = {
      ...this.getUser(),
      ...user
    }
  }
}
