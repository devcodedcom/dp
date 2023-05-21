import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClientForm, DialogData, DialogRowData } from '../../models/on-init-dialog.interface';

@Component({
  selector: 'app-base-dialog',
  templateUrl: './base-dialog.component.html',
  styleUrls: ['./base-dialog.component.scss']
})
export class BaseDialogComponent<T> {
  header!: string;
  label!: string;
  fb = inject(NonNullableFormBuilder);
  dialogRef: MatDialogRef<T, DialogRowData> = inject(MatDialogRef);
  dialogData: DialogData = inject(MAT_DIALOG_DATA);
  form: FormGroup<ClientForm> = this.fb.group({
    name: '',
    surname: '',
    age: 0,
    address: this.fb.group({
      street: '',
      city: ''
    })
  });

  addClient() {
    if (this.form.valid) {
      // request
      this.dialogRef.close(this.form.getRawValue());
    }
  }

  reset() {
    this.form.reset();
  }

  cancel() {
    this.dialogRef.close();
  }
}
