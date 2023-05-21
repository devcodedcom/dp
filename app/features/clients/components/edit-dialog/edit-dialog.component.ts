import { Component, OnInit } from '@angular/core';
import { BaseDialogComponent } from '../base-dialog/base-dialog.component';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: '../base-dialog/base-dialog.component.html',
  styleUrls: ['../base-dialog/base-dialog.component.scss', './edit-dialog.component.scss']
})
export class EditDialogComponent extends BaseDialogComponent<EditDialogComponent> implements OnInit {
  ngOnInit() {
    this.header = 'Edit dialog';
    this.label = 'Edit';
    this.setFormValue();
  }

  setFormValue() {
    this.form.setValue(this.dialogData.rowData);
  }
}
