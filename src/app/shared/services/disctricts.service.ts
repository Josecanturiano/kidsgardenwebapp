import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/login/services/auth-service.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DistrictsService {

  constructor( private http: HttpClient ) { }

  getRegionals(){
    return this.http.get(`${environment.API_URL}/selector/regionales`);
  }

  getDistricts( regionalId ){
    console.log(`${environment.API_URL}/selector/Distritos?Regional_ID=`+ regionalId );
    return this.http.get(`${environment.API_URL}/selector/Distritos?Regional_ID=`+ regionalId );
  }
}
