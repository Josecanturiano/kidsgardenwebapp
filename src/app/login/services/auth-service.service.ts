import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {SectionsService} from 'src/app/shared/services/sections.service';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
  ) {
  }

  login(username: string, password: string) {
    return this.http.post(`${environment.API_URL}/session/LoginAsync`, {
      Usuario: username,
      Password: password
    }).pipe(map(user => {
      console.log(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      return user;
    }));
  }

  logout() {
    localStorage.clear();
  }

  createSchool(school) {
    return this.http.post(`${environment.API_URL}/session/RegistroInstitucion`, {...school});
  }

  public get currentUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  public get isTeacher() {
    return this.currentUser?.UserInfo?.Rol === 'Docente';
  }

  public get currentTeacher() {
    return JSON.parse(localStorage.getItem('currentTeacher'));
  }

  public get currentStudent() {
    return JSON.parse(localStorage.getItem('currentStudent'));
  }

  public get institutionId() {
    return JSON.parse(localStorage.getItem('currentUser')).UserInfo.ID_Institucion;
  }

  public get userId() {
    return JSON.parse(localStorage.getItem('currentUser')).UserInfo.Usuario_ID;
  }
}
