import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
  ]
})
export class NavbarComponent implements OnInit {
  nameUser: string;
  constructor(private _store: Store<AppState>) { }

  ngOnInit(): void {
    this._store.select('user').subscribe(({user}) => {
      if(user) {
        this.nameUser = user.nombre;
      }
    });
  }

}
