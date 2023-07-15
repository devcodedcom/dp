import { ResolveFn } from '@angular/router';
import { User } from './users/users-event-mediator.service';

export const userResolver: ResolveFn<User> = (route, state) => {
  return {
    name: 'Lukasz',
    description: 'Fajger',
    person: '',
    listOfTasks: [],
    done: false,
  };
};
