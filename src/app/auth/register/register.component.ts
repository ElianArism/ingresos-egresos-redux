import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as ui from "../../shared/ui.actions";
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from 'src/app/services/auth.service';
import { HelpersService } from 'src/app/services/helpers.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit, OnDestroy {
  registroForm: FormGroup;
  loading: boolean = false; 
  uiSubscription: Subscription; 

  constructor(
    private _fb: FormBuilder, 
    private _authService : AuthService, 
    private _router: Router, 
    private _helper: HelpersService,
    private _store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.registroForm = this._fb.group({
      nombre: ['', Validators.required], 
      correo: ['', [Validators.required, Validators.email]], 
      password: ['', Validators.required], 
    })

    this.uiSubscription = this._store.select('ui')
    .subscribe(ui => {
      this.loading = ui.isLoading; 
      console.log('Estado isLoading  ', ui.isLoading);
    })
  }
  

  registrar() {
    if(this.registroForm.invalid) return; 
    
    this._store.dispatch( ui.isLoading() ); 

    this._authService.crearUsuario(this.registroForm.value)
      .then(userCredentials => {
        console.log(userCredentials);
        this._store.dispatch( ui.stopLoading() );
        this._router.navigate(['/']);
      })
      .catch(err => this._store.dispatch( ui.stopLoading() ));
  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }
}
