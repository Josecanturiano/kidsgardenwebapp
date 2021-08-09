import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {first} from 'rxjs/operators';
import {AuthService} from 'src/app/login/services/auth-service.service';
import {AlertService} from 'src/app/shared/services/alert.service';
import {PersonService} from 'src/app/shared/services/personas.service';
import {SectionsService} from 'src/app/shared/services/sections.service';
import {StudentsService} from 'src/app/shared/services/students.service';
import {environment} from 'src/environments/environment';

@Component({
  selector: 'app-teachers-view',
  templateUrl: './teachers-view.component.html',
  styleUrls: ['./teachers-view.component.scss'],
})
export class TeachersViewComponent implements OnInit {

  teacher: any = {};
  formGroup: FormGroup;
  submitted = false;
  readonly = true;
  phoneMask = [/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  genders = environment.genders;

  date = new Date();
  minDateAccepted = new Date(this.date.getFullYear() - 80, this.date.getMonth(), this.date.getDay());
  maxDateAccepted = new Date(this.date.getFullYear() - 18, this.date.getMonth(), this.date.getDay());


  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private personService: PersonService,
    private user: AuthService,
    private students: StudentsService,
    private route: Router,
    private alertService: AlertService,
    private activedRouter: ActivatedRoute,
    private sectionService: SectionsService
  ) {
  }

  async ngOnInit() {

    this.createForm();

    await this.alertService.presentLoading();

    if (this.activedRouter.snapshot.paramMap.get('id')) {

      this.personService.getUser(this.activedRouter.snapshot.paramMap.get('id'))
        .subscribe((x: any) => {
            this.teacher = x;
            this.formGroup.patchValue(x);
            console.log(x.Usuario);
            this.alertService.dismissLoading();
          },
          error => {
            this.alertService.dismissLoading();
            this.alertService.error('error');
            console.log(error);
          }
        );

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

    const teacher = {
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
          this.route.navigate(['school/users']);
          this.alertService.success('Modificación completa');
        },
        error => {
          this.alertService.dismissLoading();
          this.alertService.success('Ha ocurrido un error');
          this.alertService.error(error);
        }
      );
  }

}
