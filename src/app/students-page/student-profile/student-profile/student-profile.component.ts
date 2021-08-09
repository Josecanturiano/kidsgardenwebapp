import {Component, OnInit} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PersonService} from '../../../shared/services/personas.service';
import {AlertService} from '../../../shared/services/alert.service';
import {AuthService} from '../../../login/services/auth-service.service';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.scss'],
})
export class StudentProfileComponent implements OnInit {

  student: any = {};
  genders = environment.genders;
  grades = environment.grades;
  formGroup: FormGroup;

  constructor(private personService: PersonService,
              private alertService: AlertService,
              private formBuilder: FormBuilder,
              private userService: AuthService
  ) {
  }

  ngOnInit() {

    this.createForm();

    this.alertService.presentLoading();

    this.personService.getUser(this.userService.userId)
      .subscribe((x: any) => {
        this.student = x.estudiante;
        this.student.IDs_tutores = x.Tutores[0].ID_Persona || 0;
        this.formGroup.patchValue(this.student);
        this.formGroup.controls.IDs_tutores.setValue({Nombre: x.Tutores[0].Nombre + ' ' + x.Tutores[0].Apellidos || ''});
        this.alertService.dismissLoading();
      });

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

}
