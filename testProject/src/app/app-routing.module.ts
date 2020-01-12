import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PhonebookComponent } from './phonebook/phonebook.component';


const routes: Routes = [ {
  path: '',      component: LoginComponent },
{ path: 'phonebook', component: PhonebookComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
