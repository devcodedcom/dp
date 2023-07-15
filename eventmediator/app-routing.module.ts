import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { userResolver } from './user.resolver';

const routes: Routes = [
  {
    path: 'user/add',
    component: UsersComponent
  },
  {
    path: 'user/edit/:name',
    component: UsersComponent,
    resolve: {
      user: userResolver
    }
  },
  {
    path: '**', redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
