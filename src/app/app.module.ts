import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

// modulos
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';

// firebase
import { AngularFireModule } from '@angular/fire'; // mod config firebase
import { AngularFirestoreModule } from '@angular/fire/firestore'; // mod config firestore db
import { AngularFireAuthModule } from '@angular/fire/auth'; // mod config auth firebase

import { environment } from 'src/environments/environment';

// NGRX 
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { appReducers } from './app.reducer';

@NgModule({
  declarations: [
    AppComponent,
  ],

  imports: [
    BrowserModule,
    AuthModule,
    SharedModule,

    AppRoutingModule, 
    AngularFireModule.initializeApp(environment.firebase), 
    AngularFirestoreModule, 
    AngularFireAuthModule, 
    StoreModule.forRoot( appReducers ), 
    StoreDevtoolsModule.instrument({
      maxAge: 25, 
      logOnly: environment.production
    }),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
