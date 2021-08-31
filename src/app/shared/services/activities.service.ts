import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {AuthService} from '../../login/services/auth-service.service';
import {stringify} from 'querystring';

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
    return this.http.get(`${environment.API_URL}/actividades/GetActividadesAll?Institucion_ID=` + this.user.institutionId + '&Tipo_ID=1');
  }

  createActivity(activity) {
    activity.Creador = this.user.userId;
    activity.Tipo_ID = 1;
    activity.Institucion_ID = this.user.institutionId;
    return this.http.post(`${environment.API_URL}/actividades/CreateActividad`, activity);
  }

  updateActivity(activity) {
    return this.http.post(`${environment.API_URL}/actividades/UpdateActividad`, activity);
  }

  createEvaluation(evaluation) {
    evaluation.Creador = this.user.userId;
    evaluation.Institucion_ID = this.user.institutionId;
    evaluation.Tipo_ID = 2;
    return this.http.post(`${environment.API_URL}/actividades/CreateEvaluacion`, evaluation);
  }

  updateEvaluation(evaluation) {
    return this.http.post(`${environment.API_URL}/actividades/UpdateEvaluacion`, evaluation);
  }

  getAllEvaluations() {
    return this.http.get(`${environment.API_URL}/actividades/GetActividadesAll?Institucion_ID=` + this.user.institutionId + '&Tipo_ID=2');
  }

  getActivitiesBySectionForTeacher() {
    return this.http.get(`${environment.API_URL}/actividades/GetActividadesParaSeccion?Seccion_ID=` + this.user.currentTeacher.Seccion_ID + `&Competencia=&Titulo=`);
  }

  getActivitiesByStudent(){
    return this.http.get(`${environment.API_URL}/actividades/GetActividadesPorSeccion?Seccion_ID=${this.user.currentStudent.estudiante.Seccion_ID}&Tipo_ID=1&True=true`);
  }

  getEvaluationsBySection(id) {
    return this.http.get(`${environment.API_URL}/actividades/GetActividadesPorSeccion?Seccion_ID=${id}&Tipo_ID=2&True=true`);
  }

  deleteActivity(id) {
    return this.http.post(`${environment.API_URL}/actividades/DeleteActividad`, {ID_Actividad: id});
  }

  getActivityById(id: string) {
    return this.http.get(`${environment.API_URL}/actividades/GetActividadesByID?Actividad_ID=` + id);
  }

  getEvaluationById(id: string) {
    return this.http.get(`${environment.API_URL}/actividades/GetEvaluacionesByID?Evaluacion_ID=` + id);
  }

  deleteEvaluation(id) {
    return this.http.post(`${environment.API_URL}/actividades/DeleteEvaluacion`, {ID_Evaluacion: id});
  }

  getEvaluationResults() {
    // return this.http.post(`${environment.API_URL}/actividades/DeleteEvaluacion`, {ID_Evaluacion: id});
  }

  getStudentsStarts(id: any) {
    return this.http.get(`${environment.API_URL}/actividades/GetPuntosPorEstudiante?Estudiante_ID=` + id);
  }

  setObjetiveToActiviy(activityId: any, objetiveId: any) {
    const data = {
      Objetivo_ID: objetiveId,
      Actividad_ID: activityId,
      CreadoPor: this.user.userId,
    };
    return this.http.post(`${environment.API_URL}/Actividades/CreateObjetivoPorActividad`, data);
  }

  asignActivityToSection(art: any) {
    art.Valor_de_la_actividad = 100;
    art.Puntos_estudiante = 10;
    return this.http.post(`${environment.API_URL}/Docentes/AsignarActividad`, art);
  }
}
