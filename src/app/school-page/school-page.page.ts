import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../login/services/auth-service.service';

@Component({
  selector: 'app-school-page',
  templateUrl: './school-page.page.html',
  styleUrls: ['./school-page.page.scss'],
})
export class SchoolPagePage {

  constructor(
    private user: AuthService,
    private route: Router
  ) { }

  public currentUser = {
    username: this.user.currentUser.UserInfo.CodigoUsuario,
    name: this.user.currentUser.UserInfo.Nombre,
    lastname: this.user.currentUser.UserInfo.Apellidos,
  };

  public appPages = [
    { title: 'Inicio', url: '/school/dashboard', icon: 'home' },
    { title: 'Estudiantes', url: '/school/students', icon: 'child_care' },
    { title: 'Docentes', url: '/school/teachers', icon: 'perm_identity' },
    { title: 'Asistentes', url: '/school/assistants', icon: 'people' },
    { title: 'Usuarios', url: '/school/users', icon: 'manage_accounts' },
    { title: 'Actividades', url: '/school/activities', icon: 'emoji_flags' },
    { title: 'Evaluaciones', url: '/school/evaluations', icon: 'description' },
    { title: 'Tutores', url: '/school/tutors', icon: 'supervisor_account' },
    { title: 'Secciones', url: '/school/sections', icon: 'grading' },
  ];

  logout(){
    this.user.logout();
  }
}
