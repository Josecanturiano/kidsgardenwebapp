import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {first, map} from 'rxjs/operators';
import {AuthService} from 'src/app/login/services/auth-service.service';
import {AlertService} from 'src/app/shared/services/alert.service';
import {PersonService} from 'src/app/shared/services/personas.service';
import {SectionsService} from 'src/app/shared/services/sections.service';
import {StudentsService} from 'src/app/shared/services/students.service';
import {environment} from 'src/environments/environment';

@Component({
  selector: 'app-student-view',
  templateUrl: './student-view.component.html',
  styleUrls: ['./student-view.component.scss'],
})
export class StudentViewComponent implements OnInit {


  constructor(
    private formBuilder: FormBuilder,
    private personService: PersonService,
    private user: AuthService,
    private students: StudentsService,
    private route: Router,
    private alertService: AlertService,
    private activedRouter: ActivatedRoute,
    private studentService: StudentsService
  ) {
  }

  get f() {
    return this.formGroup.controls;
  }

  student: any = {};
  formGroup: FormGroup;
  submitted = false;
  tutor_id: any;
  readonly = true;
  phoneMask = [/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  genders = environment.genders;
  grades = environment.grades;

  date = new Date();
  minDateAccepted = new Date(this.date.getFullYear() - 2, this.date.getMonth(), this.date.getDay());
  maxDateAccepted = new Date(this.date.getFullYear() - 6, this.date.getMonth(), this.date.getDay());

  results: any;

  async ngOnInit() {

    this.createForm();

    await this.alertService.presentLoading();

    if (this.activedRouter.snapshot.paramMap.get('id')) {

      this.studentService.getStudentById(this.activedRouter.snapshot.paramMap.get('id'))
        .subscribe((x: any) => {
            this.alertService.dismissLoading();
            this.student = x.estudiante;
            this.student.IDs_tutores = x.Tutores[0].ID_Persona || 0;
            this.formGroup.patchValue(this.student);
            this.formGroup.controls.IDs_tutores.setValue({Nombre: x.Tutores[0].Nombre + ' ' + x.Tutores[0].Apellidos || ''});
          }, (error) => {
            this.alertService.dismissLoading();
          }
        );

    }
  }

  search(event) {
    this.personService.getPersonByFullName(event.query).pipe(map(person => {
      return person.map(x => {
        return {Nombre: x.Nombre + ' ' + x.Apellidos, Id: x.ID_Persona};
      });
    })).subscribe(data => {
      this.results = data;
    });
  }

  handleSelectItem(event) {
    this.tutor_id = event.Id;
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      CodigoUsuario: [null, Validators.required],
      Nombre: [null, Validators.required],
      Apellidos: [null, Validators.required],
      Telefono: [null, Validators.required],
      Genero_ID: [null, Validators.required],
      Direccion: [null, Validators.required],
      Fecha_De_Nacimiento: [null, Validators.required],
      Grado_ID: [null, Validators.required],
      IDs_tutores: [null, Validators.required],
      Foto: [null, Validators.required],
      foto_raw: [null, Validators.required],
    });
  }

  public convertFileToBase64(e: File[]) {
    console.log(e);
    const file = e[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      this.f.Foto.setValue(reader.result);
      this.student.Foto = reader.result.toString();
    };
    reader.readAsDataURL(file);
  }

  onSubmit() {
    this.submitted = true;

    const student = {
      ...this.formGroup.value,
      InstitucionId: this.user.institutionId,
      AdminId: this.user.userId,
      UserId: this.student.Id_Usuario,
      Fecha_de_nacimiento: null
    };
    student.Genero = student.Genero_ID;
    delete student.Genero_ID;

    student.Fecha_de_nacimiento = student.Fecha_De_Nacimiento;
    delete student.Fecha_De_Nacimiento;
    delete student.IDs_tutores;

    if (student.foto_raw) {
      console.log('need change photo');
      console.log({
        foto: student.Foto,
        userId: this.student.Id_Usuario
      });
      this.personService.changePhoto({
        foto: student.Foto,
        userId: student.Id_Usuario
      }).subscribe(x => {
        console.log(x);
      });
    }

    delete student.Foto;
    delete student.foto_raw;

    console.log(student);
    this.alertService.presentLoading();
    this.students.update(student)
      .subscribe(
        data => {
          this.route.navigate(['school/students']);
          this.alertService.success('Modificación completa');
          this.alertService.dismissLoading();
        },
        error => {
          this.alertService.success('Ha ocurrido un error');
          this.alertService.error(error);
          this.alertService.dismissLoading();
        }
      );
  }

  goToSectionView() {
    this.route.navigate([`school/sections/view/${this.student['Seccion_ID']}`]);
  }
}
