import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import * as auth from '../auth/auth.actions';
import * as IngresoEgresoActions from '../ingreso-egreso/ingreso-egreso.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  public userSubscription: Subscription; 
  private _copiaUser: Usuario;
  constructor(
    private authFirebase: AngularFireAuth, 
    private _router: Router, 
    private firestore: AngularFirestore, 
    private _store: Store<AppState>
  ) { }

  get User() {
    return {...this._copiaUser};
  }

  initAuthListener() {
    this.authFirebase.authState.subscribe( fUser => { 
      if(fUser) {
        // existe user
        this.userSubscription = this.firestore.doc(`${fUser.uid}/usuario`).valueChanges() // trae el usuario de firestore
          .subscribe( (firestoreUser: Usuario) => {
            const user = Usuario.fromFirebase(firestoreUser); // crear un Usuario
            this._copiaUser = {...user}; 
            this._store.dispatch( auth.setUser({user: this._copiaUser}) );  // setearlo en el store
          });
      } else {
        // no existe usuario 
        this._copiaUser = null;
        this._store.dispatch( auth.unsetUser() );
        this._store.dispatch( IngresoEgresoActions.unsetItems() );
        if(this.userSubscription) {
          this.userSubscription.unsubscribe(); 
        }
      }
    });
  }

  crearUsuario(data: {nombre: string, correo: string, password: string}) {
    const {nombre, correo: email, password} = data;

    // crear usuario
    return this.authFirebase.createUserWithEmailAndPassword(email, password)
    .then(({user}) => {
      const nuevoUser = new Usuario(user.uid, nombre, user.email); 

      // guardando usuario en lugar concreto de firestore
      return this.firestore.doc(`${user.uid}/usuario`).set( {...nuevoUser} ); 
    }); 
  }

  loginUsuario(data: {password: string, correo: string}) {
    const {correo, password} = data;
    return this.authFirebase.signInWithEmailAndPassword(correo, password);
  }

  logout() {
    return this.authFirebase.signOut();
  }

  isAuth() {
    return this.authFirebase.authState
      .pipe(
        map(fuser => fuser !== null) // regresa true o false
      );
  }
}

