import { Component, OnInit } from '@angular/core';
import { AuthService } from '../login/services/auth-service.service';

@Component({
  selector: 'app-students-page',
  templateUrl: './students-page.page.html',
  styleUrls: ['./students-page.page.scss'],
})
export class StudentsPagePage {

  constructor(
    private user: AuthService
  ) { }

  public currentUser = {
    username: this.user.currentUser['UserInfo']['CodigoUsuario'],
    name: this.user.currentUser['UserInfo']['Nombre'],
    lastname: this.user.currentUser['UserInfo']['Apellidos'],
  }

  public appPages = [
    { Titulo: 'Inicio', url: '/students/home', icon: 'home' },
    { Titulo: 'Mi perfil', url: '/students/profile', icon: 'child_care' },
  ];

  logout(){
    this.user.logout();
  }

}
