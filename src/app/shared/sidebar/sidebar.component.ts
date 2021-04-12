import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {
  nameUser: string;
  constructor(
    private _authService: AuthService,     
    private _router: Router,
    private _store: Store<AppState>) { }

  ngOnInit(): void {
    this._store.select('user').subscribe(({user}) => {
      if(user) {
        this.nameUser = user.nombre;
      }
    });
  }

  logout() {
    this._authService.logout()
    .then(() => {
      this._router.navigateByUrl('/login');
    })
    .catch(err => console.log(err)) 
  }

}
