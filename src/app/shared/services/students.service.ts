import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/login/services/auth-service.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(private http: HttpClient, private user: AuthService) { }

  getAllStudents() {
    return this.http.get(`${environment.API_URL}/institucion/GetEstudiantesAll?Institucion_ID=`+ this.user.institutionId);
  }

  getAllStudentsBySection( sectionId ){
    return this.http.get(`${environment.API_URL}/Docentes/getEstudiantesPorSeccion?id=`+ sectionId);
  }

  getStudentsAvailablesForSection( sectionId ){
    return this.http.get(`${environment.API_URL}/institucion/getEstudiantesParaAsignar?ID_Seccion=`+ sectionId);
  }

  enroll( model ){
    model['Creador'] = this.user.userId;
    return this.http.post(`${environment.API_URL}/institucion/addAlumnoUnico`, model);
  }

  create( student: any ){
    return this.http.post(`${environment.API_URL}/institucion/RegistroAlumno`, { ...student })
  }

  update( student: any ){
    return this.http.post(`${environment.API_URL}/Institucion/UpdateUser`, { ...student })
  }

}
