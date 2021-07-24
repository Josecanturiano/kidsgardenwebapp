import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/login/services/auth-service.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SectionsService {

  constructor( private http: HttpClient, private user: AuthService ) { }

  getSections(){
    return this.http.get(`${environment.API_URL}/institucion/getSeccionesAll?Institucion_ID=`+ this.user.institutionId)
  }

  getAvailableSections(){
    return this.http.get(`${environment.API_URL}/institucion/getSeccionesDisponibles?Institucion_ID=`+ this.user.institutionId)
  }

  getStudentsSections(){
    return this.http.get(`${environment.API_URL}/selector/SeccionesParaEstudiantes?Institucion_ID=` + this.user.institutionId)
  }

  setNewTeacherForSection( teacherId, sectionId ){
    const model = {
      Maestro: teacherId,
      Modificador: this.user.institutionId,
      Seccion_ID: sectionId,
    };
    return this.http.post(`${environment.API_URL}/institucion/ReasignarMaestros`, model )
  }

  setNewAssistantForSection( assistantId, sectionId ){
    const model = {
      Asistente: assistantId,
      Modificador: this.user.institutionId,
      Seccion_ID: sectionId,
    };
    return this.http.post(`${environment.API_URL}/institucion/ReasignarAsistente`, model )
  }

  reasingStudent( studentId, sectionId ){
    const model = {
      Alumno: studentId,
      Modificador: this.user.institutionId,
      Seccion_ID: sectionId,
    };
    return this.http.post(`${environment.API_URL}/institucion/ReasignarAsistente`, model )
  }

  promoteStudent( studentId, newSectionId ){
    // const model = {
    //   Alumno: studentId,
    //   Modificador: this.user.institutionId,
    //   Seccion_ID: sectionId,
    // };
    // return this.http.post(`${environment.API_URL}/institucion/ReasignarAsistente`, model )
  }

  suspendStudent( userId ){
    const model = {
      Usuario_id: userId,
      Modificador: this.user.institutionId,
    };
    return this.http.post(`${environment.API_URL}/institucion/Suspender`, model )
  }

  cancelSuspendStudent( userId ){
    const model = {
      Usuario_id: userId,
      Modificador: this.user.institutionId,
    };
    return this.http.post(`${environment.API_URL}/institucion/QuitarSuspencion`, model )
  }

  createSection( section ){
    section['Institucion_ID'] = this.user.institutionId;
    section['Creador'] = this.user.userId;
    return this.http.post(`${environment.API_URL}/institucion/CreateSeccion`, section );
  }

  addStudentToSection( studentId, sectionId ){
    const model = {
      ID_Estudiante: studentId, 
      Seccion_ID: sectionId,
      Creador: this.user.userId
    };
    return this.http.post(`${environment.API_URL}/institucion/AddAlumnoUnico`, model );
  }
}
