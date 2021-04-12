import { ActionReducerMap } from '@ngrx/store';

import * as ui from './shared/ui.reducer';
import * as auth from "./auth/auth.reducer";
import * as IngresosEgresos from "./ingreso-egreso/ingreso-egreso.reducer";

// reducer global de la aplicacion 
export interface AppState {
   ui: ui.State, 
   user: auth.State, 
}

export const appReducers: ActionReducerMap<AppState> = {
   ui: ui.uiReducer,
   user: auth.userReducer,
}