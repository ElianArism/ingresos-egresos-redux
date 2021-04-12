import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanLoad } from '@angular/router';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private _authService: AuthService, private _router: Router) {}

  canActivate(): Observable<boolean> {
    return this._authService.isAuth()
      .pipe(
        tap(isLogged => {
          if(!isLogged) return this._router.navigateByUrl('/login');
        })
      );
  }

  canLoad(): Observable<boolean> {
    return this._authService.isAuth()
      .pipe(
        tap(isLogged => {
          if(!isLogged) return this._router.navigateByUrl('/login');
        }), 
        take(1) // cancelar la subscripcion automaticamente despues de ser notificado por cambios, take solo deja que exista una n cantidades de subscripciones a la vez
      );
  }
  
}
