import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddDialogComponent } from './features/clients/components/add-dialog/add-dialog.component';
import { EditDialogComponent } from './features/clients/components/edit-dialog/edit-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public dialog: MatDialog) {}

  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddDialogComponent, {
      data: {type: 'add', rowData: 'Here is add rowData'},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  openEditDialog(): void {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: {
        type: 'edit',
        rowData: {
          name: 'Lukasz',
          surname: 'Fajger',
          age: 33,
          address: {
            street: 'Somewhere',
            city: 'Warsaw'
          }
        }},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }
}
