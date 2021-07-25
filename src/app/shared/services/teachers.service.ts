import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/login/services/auth-service.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeachersService {

  constructor(private http: HttpClient, private user: AuthService) { }

  getAllTeachers(){
    return this.http.get(`${environment.API_URL}/institucion/GetDocentesAll?Institucion_ID=` + this.user.institutionId);
  }

  getAllAssistants(){
    return this.http.get(`${environment.API_URL}/institucion/GetAsistentesAll?Institucion_ID=` + this.user.institutionId);
  }

  getAllUsers(){
    console.log(`${environment.API_URL}/institucion/getAdminsByQueryAndFilters?Q=&Institucion_ID=` + this.user.institutionId);
    return this.http.get(`${environment.API_URL}/institucion/getAdminsByQueryAndFilters?Q=&Institucion_ID=` + this.user.institutionId);
  }

}
