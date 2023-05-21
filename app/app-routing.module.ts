import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDialogComponent } from './features/clients/components/add-dialog/add-dialog.component';
import { EditDialogComponent } from './features/clients/components/edit-dialog/edit-dialog.component';

const routes: Routes = [
  {
    path: 'add',
    component: AddDialogComponent
  },
  {
    path: 'edit',
    component: EditDialogComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
