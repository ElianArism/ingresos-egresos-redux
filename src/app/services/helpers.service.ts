import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class HelpersService {

  constructor() {}

  createAlertSpinner() {
    Swal.fire({
      title: 'Ingresando...',
      onBeforeOpen: () => Swal.showLoading()
    })
  }
}
