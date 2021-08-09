import {Injectable} from '@angular/core';
import Swal from 'sweetalert2';
import {LoadingController} from '@ionic/angular';

@Injectable({providedIn: 'root'})
export class AlertService {

  constructor(private loadingController: LoadingController) {
  }

  loading: any;

  basic(message) {
    Swal.fire(message);
  }

  ask(title, message) {
    Swal.fire(
      title,
      message,
      'question',
    );
  }

  success(message: string, title: string = 'Completado') {
    Swal.fire({
      icon: 'success',
      title,
      text: message,
      heightAuto: false
    });
  }

  error(message: string, keepAfterRouteChange = false) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: message,
      heightAuto: false
    });
  }

  async presentLoading(message: string = 'Por favor espere...') {
    this.loading = await this.loadingController.create({message});
    return await this.loading.present();
  }

  dismissLoading() {
    this.loading.dismiss();
  }
}
