import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Observable, Subject } from 'rxjs';
import Swal from 'sweetalert2'

@Injectable({ providedIn: 'root' })
export class AlertService {
    
    constructor( private loadingController: LoadingController ) {}

    basic( message ){
        Swal.fire(message)
    }

    ask(title, message){
        Swal.fire(
            title,
            message,
            'question',
        )
    }

    success( message: string, title: string = 'Completado' ) {
        Swal.fire({
            icon: 'success',
            title: title,
            text: message,
            heightAuto: false
          })
    }

    error(message: string, keepAfterRouteChange = false) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: message,
            heightAuto: false
          })
    }

    loading: any;
  
    async presentLoading( message: string = 'Por favor espere...' ) {
      this.loading = await this.loadingController.create({ message });
      return this.loading.present();
    }
  
    dismissLoading(){
      this.loading.dismiss();
    }
}