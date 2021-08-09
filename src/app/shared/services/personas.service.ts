import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AuthService} from 'src/app/login/services/auth-service.service';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private http: HttpClient, private auth: AuthService) {
  }

  getPersonByFullName(fullName: string): Observable<any> {
    return this.http.get(`${environment.API_URL}/institucion/getPersonasByQuery?Q=` + fullName + `&institucion_id=` + this.auth.institutionId);
  }

  getTutorById(tutorId) {
    console.log( `${environment.API_URL}/institucion/getInfoTutor?id=` + tutorId + '&Institucion_ID=' + this.auth.institutionId );
    return this.http.get(`${environment.API_URL}/institucion/getInfoTutor?id=` + tutorId + '&Institucion_ID=' + this.auth.institutionId);
  }

  getTeachers() {
    return this.http.get(`${environment.API_URL}/institucion/GetDocentesAll?Institucion_ID=` + this.auth.institutionId);
  }

  getTeachersByFullName(fullName): Observable<any> {
    return this.http.get(`${environment.API_URL}/institucion/getDocentesByQueryAndFilters?Q=${fullName}&Institucion_ID=` + this.auth.institutionId);
  }

  getAssistantsByFullName(fullName): Observable<any> {
    return this.http.get(`${environment.API_URL}/institucion/getAsistentesByQueryAndFilters?Q=${fullName}&Institucion_ID=` + this.auth.institutionId);
  }

  createTeacher(teacher: any) {
    return this.http.post(`${environment.API_URL}/Institucion/RegistroMaestro`, {...teacher});
  }

  createAssistant(teacher: any) {
    return this.http.post(`${environment.API_URL}/Institucion/RegistroAsistente`, {...teacher});
  }

  createUser(teacher: any) {
    return this.http.post(`${environment.API_URL}/Institucion/RegistroDireccion`, {...teacher});
  }

  getUser(id) {
    return this.http.get(`${environment.API_URL}/institucion/getInfoDirector/?id=` + id + `&Institucion_ID=` + this.auth.institutionId);
  }

  createPerson(person) {
    return this.http.post(`${environment.API_URL}/Institucion/RegistroPersona`, person);
  }

  updatePerson(person) {
    return this.http.post(`${environment.API_URL}/Institucion/updateTutor`, person);
  }

  getPersons(name: string = '') {
    return this.http.get(`${environment.API_URL}/institucion/getPersonasByQuery?Q=${name}&Institucion_ID=${this.auth.institutionId}`);
  }

  changePhoto(user) {
    return this.http.post(`${environment.API_URL}/institucion/CambiarFoto`, user);
  }

  deleteUser(id) {
    const deleteModel = {
      Usuario_ID: id,
      Modificador: this.auth.userId
    };
    console.log(deleteModel);
    return this.http.post(`${environment.API_URL}/institucion/eliminar`, deleteModel);
  }
}
