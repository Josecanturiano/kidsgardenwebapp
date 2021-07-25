import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/login/services/auth-service.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { PersonService } from 'src/app/shared/services/personas.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tutors-form',
  templateUrl: './tutors-form.component.html',
  styleUrls: ['./tutors-form.component.scss'],
})
export class TutorsFormComponent implements OnInit {

  formGroup: FormGroup;
  genders = environment.genders;
  phoneMask = [/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  date = new Date();
  minDateAccepted = new Date( this.date.getFullYear() - 80, this.date.getMonth(), this.date.getDay() );
  maxDateAccepted = new Date( this.date.getFullYear() - 18, this.date.getMonth(), this.date.getDay() );


  constructor(
    private formBuilder: FormBuilder,
    private personService: PersonService,
    private route: Router,
    private auth: AuthService,
    private alertService: AlertService,
  ) { }

  createForm() {
    this.formGroup = this.formBuilder.group({
      Nombre: [null, Validators.required],
      Apellidos: [null, Validators.required],
      Telefono: [null, Validators.required],
      Genero_ID: [null, Validators.required],
      Direccion: [null, Validators.required],
      Fecha_De_Nacimiento: [null, Validators.required],
    });
  }

  get f() { return this.formGroup.controls; }

  ngOnInit() {
    this.createForm();
  }

  onSubmit(){
    const person = {
      ...this.formGroup.value,
      Creador: this.auth.userId,
    };
    this.alertService.presentLoading();
    console.log(person);
    this.personService.createPerson( person ).subscribe(x => {
      console.log(x);
      this.route.navigate(['school/tutors']);
      this.alertService.dismissLoading();
    });
  }

}
