import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SuscriptionDetailsComponent } from 'src/app/shared/components/suscription-details/suscription-details.component';
import { AlertService } from 'src/app/shared/services/alert.service';
import { DistrictsService } from 'src/app/shared/services/disctricts.service';
import { LicenceService } from 'src/app/shared/services/licence.service';
import { environment } from 'src/environments/environment';
import { AuthService } from '../services/auth-service.service';

@Component({
  selector: 'app-sing-up-school',
  templateUrl: './sing-up-school.component.html',
  styleUrls: ['./sing-up-school.component.scss'],
})
export class SingUpSchoolComponent implements OnInit {

  formGroup: FormGroup;
  submitted = false;
  regionals = [];
  districts = [];
  licences: any;
  ranges: any;
  phoneMask = [/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  img = environment.img_school;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService,
    private districtsService: DistrictsService,
    public dialog: MatDialog,
    private licenceService: LicenceService
  ) {
    this.licenceService.getLicences().subscribe(x => {
      this.licences = x;
    });
  }

  ngOnInit() {
    this.createForm();

    this.districtsService.getRegionals().subscribe((x: any[]) => {
      console.log(x);
      this.regionals = x;
    });

  }

  onLicencesComboChange( licence ){
    this.licenceService.getRanges( licence.value ).subscribe(x => {
      this.ranges = x;
    });
  }

  onRegionalsComboChange( regional ){
    this.districtsService.getDistricts( regional.value ).subscribe((x: any[]) => {
      console.log(x);
      this.districts = x;
    });
  }

  public convertFileToBase64( e: File[] ){
    console.log(e);
    const file = e[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      this.f.Logo.setValue(reader.result);
      this.img = reader.result.toString();
    };
    reader.readAsDataURL(file);
  }

  showSuscriptionDetails(){
    this.dialog.open(SuscriptionDetailsComponent);
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      NombreInstitucion: [null, Validators.required],
      Distrito_ID: [null, Validators.required],
      EmailInstitucion: [null, Validators.required],
      TelefonoInstitucion: [null, Validators.required],
      DireccionInstitucion: [null, Validators.required],
      Rango_ID: [null, Validators.required],
      Licencia_ID: [null, Validators.required],
      Logo: [null, Validators.required],
      Logo_raw: [null, Validators.required],
    });
  }

  get f() { return this.formGroup.controls; }

  onSubmit(){
    this.submitted = true;
    console.log(this.formGroup);
    if (this.formGroup.valid){
      this.router.navigateByUrl('login/sign-up-user', { state: { data: {...this.formGroup.value } } } );
    }
  }
}
