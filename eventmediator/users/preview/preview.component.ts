import { Component, inject, OnInit } from '@angular/core';
import { UsersEventMediatorService } from '../users-event-mediator.service';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {
  name!: string;
  description!: string;
  usersEventService = inject(UsersEventMediatorService);

  ngOnInit() {
    this.initData();

    this.usersEventService.formChanged.subscribe((formData) => {
      const { name, description } = formData;

      this.name = name;
      this.description = description;

      console.log(this.usersEventService.getUser());
    })
  }

  private initData() {
    const { name, description, person } = this.usersEventService.getUser();

    this.name = name;
    this.description = description;
  }
}
