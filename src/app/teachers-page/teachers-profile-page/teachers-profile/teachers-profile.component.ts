import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {PersonService} from '../../../shared/services/personas.service';
import {AuthService} from '../../../login/services/auth-service.service';
import {StudentsService} from '../../../shared/services/students.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertService} from '../../../shared/services/alert.service';
import {SectionsService} from '../../../shared/services/sections.service';
import {first} from 'rxjs/operators';
import {TeachersService} from '../../../shared/services/teachers.service';

@Component({
  selector: 'app-teachers-profile',
  templateUrl: './teachers-profile.component.html',
  styleUrls: ['./teachers-profile.component.scss'],
})
export class TeachersProfileComponent implements OnInit {

  teacher: any = {};
  formGroup: FormGroup;
  submitted = false;
  readonly = true;
  phoneMask = [/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  date = new Date();
  minDateAccepted = new Date(this.date.getFullYear() - 80, this.date.getMonth(), this.date.getDay());
  maxDateAccepted = new Date(this.date.getFullYear() - 18, this.date.getMonth(), this.date.getDay());


  genders = environment.genders;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private personService: PersonService,
    private user: AuthService,
    private students: StudentsService,
    private route: Router,
    private alertService: AlertService,
    private activedRouter: ActivatedRoute,
    private sectionService: SectionsService,
    private teacherService: TeachersService,
    private authService: AuthService
  ) {
  }

  async ngOnInit() {

    this.createForm();

    await this.alertService.presentLoading();

    this.teacherService.getTeacherInfo( this.authService.userId )
      .subscribe((x: any) => {
          this.teacher = x;
          this.formGroup.patchValue(x);
          this.alertService.dismissLoading();
        },
        error => {
          this.alertService.dismissLoading();
          this.alertService.error('error');
          console.log(error);
        }
      );
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      Nombre: [null, Validators.required],
      Apellidos: [null, Validators.required],
      Telefono: [null, Validators.required],
      Genero_ID: [null, Validators.required],
      Direccion: [null, Validators.required],
      Fecha_De_Nacimiento: [null, Validators.required],
      Foto: [null, Validators.required],
      foto_raw: [null],
    });
  }

  public convertFileToBase64(e: File[]) {
    console.log(e);
    const file = e[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      this.f.Foto.setValue(reader.result);
      this.teacher.Foto = reader.result.toString();
    };
    reader.readAsDataURL(file);
  }

  get f() {
    return this.formGroup.controls;
  }

  onSubmit() {
    this.submitted = true;

    const teacher: any = {
      ...this.formGroup.value,
      InstitucionId: this.user.institutionId,
      AdminId: this.user.userId,
      UserId: this.teacher.Id_Usuario,
    };
    teacher.Genero = teacher.Genero_ID;
    delete teacher.Genero_ID;
    teacher.Fecha_de_nacimiento = teacher.Fecha_De_Nacimiento;

    if (teacher.foto_raw) {
      this.personService.changePhoto({
        foto: teacher.Foto,
        userId: teacher.UserId
      }).subscribe(x => {
        console.log(x);
      });
    }

    delete teacher.Fecha_De_Nacimiento;
    delete teacher.Foto;

    delete teacher.foto_raw;


    this.alertService.presentLoading();
    this.students.update(teacher).pipe(first())
      .subscribe(
        data => {
          this.alertService.dismissLoading();
          this.route.navigate(['school/teachers']);
          this.alertService.success('Modificación completa');
          console.log(data);
        },
        error => {
          this.alertService.dismissLoading();
          this.alertService.success('Ha ocurrido un error');
          this.alertService.error(error);
        }
      );
  }

}
