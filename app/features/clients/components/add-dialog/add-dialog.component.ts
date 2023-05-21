import { Component, OnInit } from '@angular/core';
import { BaseDialogComponent } from '../base-dialog/base-dialog.component';

@Component({
  selector: 'app-add-dialog',
  templateUrl: '../base-dialog/base-dialog.component.html',
  styleUrls: ['../base-dialog/base-dialog.component.scss', './add-dialog.component.scss']
})
export class AddDialogComponent extends BaseDialogComponent<AddDialogComponent> implements OnInit {
  ngOnInit() {
    this.header = 'Add dialog';
    this.label = 'Add';
  }
}
