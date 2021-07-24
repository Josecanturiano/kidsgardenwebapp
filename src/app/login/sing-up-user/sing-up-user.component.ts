import {stringify} from '@angular/compiler/src/util';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AlertService} from 'src/app/shared/services/alert.service';
import {DistrictsService} from 'src/app/shared/services/disctricts.service';
import {environment} from 'src/environments/environment';
import {AuthService} from '../services/auth-service.service';

@Component({
  selector: 'app-sing-up-user',
  templateUrl: './sing-up-user.component.html',
  styleUrls: ['./sing-up-user.component.scss'],
})
export class SingUpUserComponent implements OnInit {

  img = environment.user_logo;
  genders = environment.genders;
  formGroup: FormGroup;
  hide = true;
  hide2 = true;
  submitted = false;
  phoneMask = environment.phoneMask;

  date = new Date();
  minDateAccepted = new Date(this.date.getFullYear() - 80, this.date.getMonth(), this.date.getDay());
  maxDateAccepted = new Date(this.date.getFullYear() - 18, this.date.getMonth(), this.date.getDay());


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService,
    private districtsService: DistrictsService
  ) {
  }

  ngOnInit() {
    this.createForm();
  }

  checkPasswords(group: FormGroup) {
    const password = group.get('Password').value;
    const confirmPassword = group.get('Confirm').value;

    return password === confirmPassword ? null : {notSame: true};
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      Nombre: ['', Validators.required],
      Apellidos: ['', Validators.required],
      Telefono: ['', Validators.required],
      Genero_ID: ['', Validators.required],
      Direccion: ['', Validators.required],
      Fecha_De_Nacimiento: ['', Validators.required],
      Foto: ['', Validators.required],
      Foto_raw: ['', Validators.required],
      Password: ['', Validators.required],
      Confirm: ['', Validators.required],
    }, {validators: this.checkPasswords});
  }

  public convertFileToBase64(e: File[]) {
    console.log(e);
    const file = e[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      this.f.Foto.setValue(reader.result);
      this.img = reader.result.toString();
    };
    reader.readAsDataURL(file);
  }

  get f() {
    return this.formGroup.controls;
  }

  get g() {
    return this.formGroup;
  }

  onSubmit() {
    this.submitted = true;
    const school = {...this.formGroup.value, ...history.state.data};
    delete school.Confirm;
    delete school.Foto_raw;
    delete school.Logo_raw;

    console.log(JSON.stringify(school));

    if (this.formGroup.valid) {
      this.alertService.presentLoading('Por espere...');
      this.authService.createSchool(school).subscribe((x: any) => {
        this.alertService.dismissLoading();
        this.router.navigateByUrl('/login');
        this.alertService.success('Registro completo, su usuario es: ' + x.UserName);
      });
    }
  }

}

