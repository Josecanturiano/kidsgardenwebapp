import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {AuthService} from '../../login/services/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {

  constructor(private http: HttpClient, private user: AuthService) {
  }

  getAvailableActivitiesByStudent() {
    return this.http.get(`${environment.API_URL}/selector/regionales`);
  }

  getActivitiesByTeacher() {

  }

  getAllActivities() {
    return this.http.get(`${environment.API_URL}/actividades/GetActividadesAll`);
  }

  createActivity(activity) {
    activity.Creador = this.user.userId;
    console.log(activity);
    return this.http.post(`${environment.API_URL}/actividades/CreateActividad`, activity);
  }

  createEvaluation(evaluation) {
    evaluation.Creador = this.user.userId;
    console.log(evaluation);
    return this.http.post(`${environment.API_URL}/actividades/CreateEvaluacion`, evaluation);
  }

  getAllEvaluations() {
    return this.http.get(`${environment.API_URL}/actividades/GetEvaluacionesAll`);
  }

  getActivitiesBySection() {
    return this.http.get(`${environment.API_URL}/actividades/GetActividadesPorSeccion?Seccion_ID=` + this.user.currentTeacher.Seccion_ID );
  }
}
