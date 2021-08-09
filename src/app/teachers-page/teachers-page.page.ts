import {Component, OnInit} from '@angular/core';
import {AuthService} from '../login/services/auth-service.service';
import {TeachersService} from '../shared/services/teachers.service';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-teachers-page',
  templateUrl: './teachers-page.page.html',
  styleUrls: ['./teachers-page.page.scss'],
})
export class TeachersPagePage implements OnInit {

  currentUser: any;
  appPages: any[];

  constructor(
    private user: AuthService,
    private teacherService: TeachersService,
    private authService: AuthService,
  ) {
  }

  async ngOnInit() {
    this.currentUser = {
      username: this.user.currentUser['UserInfo']['CodigoUsuario'],
      name: this.user.currentUser['UserInfo']['Nombre'],
      lastname: this.user.currentUser['UserInfo']['Apellidos'],
    };

    const teacher = await this.getTeacherInfo();
    localStorage.setItem('currentTeacher', JSON.stringify(teacher));

    this.appPages = [
      {title: 'Mi perfil', url: '/teachers/profile', icon: 'child_care'},
      {title: 'Mi sección', url: '/teachers/section',  icon: 'grading'},
      {title: 'Actividades', url: '/teachers/activities', icon: 'emoji_flags'},
      {title: 'Evaluaciones', url: '/teachers/evaluations', icon: 'description'},
    ];

  }

  getTeacherInfo() {
    return new Promise(resolve => {
      this.teacherService.getTeacherInfo(this.authService.userId).pipe(
        take(1)
      ).subscribe(
        (data: any) => {
          resolve(data);
        });
    });
  }

  logout() {
    this.user.logout();
  }

}
