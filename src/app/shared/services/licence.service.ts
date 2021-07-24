import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LicenceService {

  constructor( private http: HttpClient ) { }

  getLicences(){
    return this.http.get(`${environment.API_URL}/Selector/Licencias`);
  }

  getRanges( licencia ){
    return this.http.get(`${environment.API_URL}/Selector/rangosuscripcion?Licencia=` + licencia);
  }

}
