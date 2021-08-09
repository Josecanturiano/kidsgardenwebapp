import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import * as moment from 'moment';
import {Observable, pipe} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, finalize, first, map, startWith, switchMap, tap} from 'rxjs/operators';
import {AuthService} from 'src/app/login/services/auth-service.service';
import {AlertService} from 'src/app/shared/services/alert.service';
import {PersonService} from 'src/app/shared/services/personas.service';
import {StudentsService} from 'src/app/shared/services/students.service';
import {environment} from 'src/environments/environment';

@Component({
  selector: 'app-students-form',
  templateUrl: './students-form.component.html',
  styleUrls: ['./students-form.component.scss'],
})
export class StudentsFormComponent implements OnInit {

  formGroup: FormGroup;
  submitted = false;
  phoneMask = [/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  tutor_id: any;
  img = 'data:image/png;base64,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';
  grades = environment.grades;

  date = new Date();
  minDateAccepted = new Date(this.date.getFullYear() - 2, this.date.getMonth(), this.date.getDay());
  maxDateAccepted = new Date(this.date.getFullYear() - 6, this.date.getMonth(), this.date.getDay());

  tutorNames: any;
  isLoading = false;
  errorMsg: string;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private personService: PersonService,
    private user: AuthService,
    private students: StudentsService,
    private route: Router,
    private alertService: AlertService
  ) {
  }

  genders = environment.genders;

  results: any;

  search(event) {
    this.personService.getPersonByFullName(event.query).pipe(map(person => {
      return person.map(x => {
        return {Nombre: x['Nombre'] + ' ' + x['Apellidos'], Id: x['ID_Persona']};
      });
    })).subscribe(data => {
      this.results = data;
    });
  }

  handleSelectItem(event) {
    this.tutor_id = event.Id;
  }

  ngOnInit() {
    this.createForm();
  }

  onValueChange(event) {
    switch (event.value) {
      case 1:
        break;
      case 2:
        break;
      case 3:
        break;
      default:
        break;
    }
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      Nombre: [null, Validators.required],
      Apellidos: [null, Validators.required],
      Telefono: [null, Validators.required],
      Genero_ID: [null, Validators.required],
      Direccion: [null, Validators.required],
      Fecha_De_Nacimiento: [null, Validators.required],
      Grado_ID: [null, Validators.required],
      IDs_tutores: [null, Validators.required],
      Foto: ['asdasd'],
      foto_raw: [null],
    });
  }

  public convertFileToBase64(e: File[]) {
    console.log(e);
    var file = e[0];
    var reader = new FileReader();
    reader.onloadend = () => {
      this.f['Foto'].setValue(reader.result);
      this.img = reader.result.toString();
    };
    reader.readAsDataURL(file);
  }

  get f() {
    return this.formGroup.controls;
  }

  onSubmit() {
    this.submitted = true;

    const student = {
      ...this.formGroup.value,
      Institucion_ID: this.user.institutionId,
      Creador: this.user.userId,
    };

    delete student.IDs_tutores;
    student.IDs_Tutores = [this.f['IDs_tutores'].value.Id];
    console.log(student);

    delete student.foto_raw;

    this.alertService.presentLoading();
    this.students.create(student)
      .subscribe(
        data => {
          this.alertService.dismissLoading();
          this.route.navigate(['school/students']);
          this.alertService.success('Registro completo');
        },
        error => {
          this.alertService.dismissLoading();
          this.alertService.success('Ha ocurrido un error');
          this.alertService.error(error.error.Message);
        }
      );
  }
}
