import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/login/services/auth-service.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { PersonService } from 'src/app/shared/services/personas.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-teachers-form',
  templateUrl: './teachers-form.component.html',
  styleUrls: ['./teachers-form.component.scss'],
})
export class TeachersFormComponent implements OnInit {

  formGroup: FormGroup;
  submitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private user: AuthService,
    private route: Router,
    private alertService: AlertService,
    private personaService: PersonService
  ) { }
  phoneMask = environment.phoneMask;
  img = environment.img_teacher;

  date = new Date();
  minDateAccepted = new Date( this.date.getFullYear() - 80, this.date.getMonth(), this.date.getDay() );
  maxDateAccepted = new Date( this.date.getFullYear() - 18, this.date.getMonth(), this.date.getDay() );

  genders = environment.genders;

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      Nombre: [null, Validators.required],
      Apellidos: [null, Validators.required],
      Telefono: [null, Validators.required],
      Genero_ID: [null, Validators.required],
      Direccion: [null, Validators.required],
      Fecha_De_Nacimiento: [null, Validators.required],
      Foto: [''],
      foto_raw: [''],
    });
  }

  public convertFileToBase64( e: File[] ){
    console.log(e);
    const file = e[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      this.f.Foto.setValue(reader.result);
      this.img = reader.result.toString();
    };
    reader.readAsDataURL(file);
  }

  get f() { return this.formGroup.controls; }

  onSubmit(){
    this.submitted = true;

    const teacher = {
      ...this.formGroup.value,
      Institucion_ID: this.user.institutionId,
      Creador: this.user.userId,
    };
    delete teacher.foto_raw;

    this.alertService.presentLoading();
    this.personaService.createAssistant(teacher).pipe(first())
    .subscribe(
        data => {
          this.alertService.dismissLoading();
          this.route.navigate(['school/assistants']);
          this.alertService.success('Registro completo');
          },
        error => {
            this.alertService.dismissLoading();
            this.alertService.success('Ha ocurrido un error');
            this.alertService.error(error);
        }
    );

  }
}
