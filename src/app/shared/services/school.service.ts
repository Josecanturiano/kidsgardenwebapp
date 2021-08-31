import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from 'src/environments/environment';
import {AuthService} from '../../login/services/auth-service.service';


@Injectable({
  providedIn: 'root'
})
export class SchoolService {

  constructor(private http: HttpClient, private user: AuthService) {
  }

  getObjetives() {
    return this.http.get(`${environment.API_URL}/selector/objetivos`);
  }

  getCompetencies() {
    return this.http.get(`${environment.API_URL}/selector/Competencias`);
  }

  getMecanicas() {
    return this.http.get(`${environment.API_URL}/selector/MecanicaDeActividad`);
  }

  changeTeacher( payload: any ) {
    payload.Modificador = this.user.userId;
    this.http.post( `${environment.API_URL}/institucion/ReasignarAsistente`, payload );
  }

  getInstitutionData() {
    // this.http.get( `${environment.API_URL}/institucion/` )
  }
}
