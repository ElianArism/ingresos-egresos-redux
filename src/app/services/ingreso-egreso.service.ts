import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  constructor( private firestore: AngularFirestore, private authService: AuthService ) { }

  crearIngresoEgreso( ingresoEgreso: IngresoEgreso ) {
    const uid = this.authService.User.uid;

    console.log(ingresoEgreso);
    //insertar registro en firestore
    return this.firestore.doc(`${uid}/ingresos-egresos`)
      .collection('items')
      .add({...ingresoEgreso, uid: uid})
    }

  initIngresosEgresosListener(uid: string) {
    //obtener datos de firestore
    return this.firestore.collection(`${uid}/ingresos-egresos/items`)
    // .valueChanges() devuelve el valor de los datos 
    .snapshotChanges() // devuelve el estado de los datos junto con sus cambios
    .pipe(
      map(snapshot => snapshot.map( doc => 
        (// mapear datos 
          {
            uid: doc.payload.doc.id,
            ...doc.payload.doc.data() as any 
          }
        )
      ))
    )
  } 


  borrarIngresoEgreso(uid_item: string) {
    const uid = this.authService.User.uid;

    return this.firestore.doc(`${uid}/ingresos-egresos/items/${uid_item}`).delete(); 
  }
}
