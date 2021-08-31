import {Component, OnInit} from '@angular/core';
import {AuthService} from '../login/services/auth-service.service';
import {ActivitiesService} from '../shared/services/activities.service';
import {StudentsService} from '../shared/services/students.service';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-students-page',
  templateUrl: './students-page.page.html',
  styleUrls: ['./students-page.page.scss'],
})
export class StudentsPagePage implements OnInit {

  constructor(
    private user: AuthService,
    private activitiesService: ActivitiesService,
    private studentService: StudentsService,
  ) {
  }

  public currentUser = {
    username: this.user.currentUser['UserInfo']['CodigoUsuario'],
    name: this.user.currentUser['UserInfo']['Nombre'],
    lastname: this.user.currentUser['UserInfo']['Apellidos'],
  };

  public appPages = [
    {title: 'Inicio', url: '/students/home', icon: 'home'},
    {title: 'Actividades', url: '/students/activities', icon: 'emoji_flags'},
    {title: 'Evaluaciones', url: '/students/evaluations', icon: 'description'},
    {title: 'Zona de juego', url: '/students/games', icon: 'videogame_asset'},
    {title: 'Mi perfil', url: '/students/profile', icon: 'child_care'},
  ];

  logout() {
    this.user.logout();
  }

  getStudentStarts() {
    this.activitiesService.getStudentsStarts(this.user.userId).subscribe(points => {
      this.currentUser['points'] = points;
    });
  }

  async ngOnInit() {
    this.getStudentStarts();

    const student = await this.getStudentInfo();
    localStorage.setItem('currentStudent', JSON.stringify(student));
  }

  getStudentInfo() {
    return new Promise(resolve => {
      this.studentService.getStudentById(this.user.userId).pipe(
        take(1)
      ).subscribe(
        (data: any) => {
          resolve(data);
        });
    });
  }

}
