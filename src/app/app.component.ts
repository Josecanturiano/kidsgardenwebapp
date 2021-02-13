import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent {

  public currentUser = {
    username: "pcanturriano",
    name: "Pablo",
    lastname: "Canturriano"
  }

  public appPages = [
    { title: 'Inicio', url: '/home', icon: 'mail' },
    { title: 'Estudiantes', url: '/students', icon: 'mail' },
    { title: 'Docentes', url: '/teachers', icon: 'paper-plane' },
    { title: 'Actividades', url: '/activities', icon: 'paper-plane' },
    { title: 'Tutores', url: '/tutors', icon: 'heart' },
    { title: 'Secciones', url: '/sections', icon: 'archive' },
    { title: 'Configuración', url: '/settings', icon: 'trash' },
    { title: 'Cerrar sesión', url: '/logout', icon: 'warning' },
  ];

  constructor() {}

}
