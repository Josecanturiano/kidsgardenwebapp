import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SchoolService {

  constructor(private http: HttpClient) {
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
}
