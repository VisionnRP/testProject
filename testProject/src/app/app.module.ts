import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatListModule} from '@angular/material/list';
import { MatButtonModule} from '@angular/material/button';
import { MatCardModule} from '@angular/material/card';
import { MatInputModule} from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule} from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../environments/environment';
import { AppRoutingModule } from '../app/app-routing.module';

import { AppComponent } from './app.component';
import { FirebaseService } from '../app/firebase/firebase.service';
import { PhonebookComponent } from './phonebook/phonebook.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { PhonebookEffects } from './store/phonebook.effects';
import {counterReducer, phonebookReducer} from '../app/store/phonebook.reducer';
import {MatIconModule} from '@angular/material/icon';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { DialogComponent } from './dialog/dialog.component';
import { MatDialogModule } from '@angular/material/dialog';





const appRoutes: Routes = [
  { path: 'login',      component: LoginComponent },
  { path: 'phonebook', component: PhonebookComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    PhonebookComponent,
    LoginComponent,
    DialogComponent,
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes),
    AppRoutingModule,
    MatDialogModule,
    MatSnackBarModule,
    BrowserModule,
    BrowserAnimationsModule,
    ScrollingModule,
    FormsModule,
    ReactiveFormsModule,
    MatListModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    FlexLayoutModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    StoreModule.forRoot({test: counterReducer}),
    EffectsModule.forRoot([PhonebookEffects]),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    MatIconModule,
    ScrollingModule,
  ],
  exports: [RouterModule],
  providers: [FirebaseService],
  bootstrap: [AppComponent, DialogComponent]
})
export class AppModule { }
