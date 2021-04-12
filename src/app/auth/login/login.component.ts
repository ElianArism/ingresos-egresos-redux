import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';

import { AuthService } from 'src/app/services/auth.service';
import { HelpersService } from 'src/app/services/helpers.service';
import * as ui from 'src/app/shared/ui.actions';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit, OnDestroy {
  loading: boolean = false;
  loginForm: FormGroup; 
  // para cancelar la subscripcion al state y evitar fuga de memoria
  uiSubscription: Subscription; 

  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _router: Router,
    private _helper: HelpersService,
    private _store: Store<AppState>
  ) { }

  ngOnInit(): void {

    this._authService.logout().then(() => {});

    this.loginForm = this._fb.group({
      correo: ['', Validators.required], 
      password: ['', Validators.required]
    });

    this.uiSubscription = this._store.select('ui')
    .subscribe(ui => {
      this.loading = ui.isLoading; 
      console.log(`Estado actual   `, this.loading);
    });
  }


  login() {
    if(this.loginForm.invalid) return;

    this._store.dispatch(ui.isLoading());

    this._authService.loginUsuario(this.loginForm.value)
      .then(userLogged => {
        this._store.dispatch(ui.stopLoading());
        this._router.navigateByUrl('/');
      })
      .catch(err => this._store.dispatch(ui.stopLoading()));
  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }
}
