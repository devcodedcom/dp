import { Component, inject, OnInit } from '@angular/core';
import { UsersEventMediatorService } from './users-event-mediator.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [UsersEventMediatorService]
})
export class UsersComponent implements OnInit {
  userEventService = inject(UsersEventMediatorService);
  activatedRoute = inject(ActivatedRoute);

  ngOnInit() {
    this.setUserIfEditMode();
  }

  private setUserIfEditMode() {
    const user = this.activatedRoute.snapshot.data['user']

    if (user) {
      this.userEventService.setUser(user);
    }
  }
}
