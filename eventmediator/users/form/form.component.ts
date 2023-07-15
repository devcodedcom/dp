import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UsersEventMediatorService } from '../users-event-mediator.service';

export interface UsersFormData<T> {
  name: T;
  description: T;
  person: T;
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  form!: FormGroup<UsersFormData<FormControl<string>>>;

  fb = inject(NonNullableFormBuilder);
  destroyRef = inject(DestroyRef);
  usersEventService = inject(UsersEventMediatorService);

  ngOnInit() {
    console.log('FormComponent');
    this.initForm();

    this.form.controls.name.valueChanges.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe((term) => {
      this.usersEventService.notifyOnFormChanged(this.form.getRawValue())
    })

    this.form.controls.description.valueChanges.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe((term) => {
      this.usersEventService.notifyOnFormChanged(this.form.getRawValue())
    })
  }

  onClick() {
    console.log(this.usersEventService.getUser())
  }

  private initForm() {
    const { name, description, person } = this.usersEventService.getUser();

    this.form = this.fb.group({
      name: name ? name : '',
      description: description ? description : '',
      person: person ? person : '',
    })
  }
}
