import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/login/services/auth-service.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { PersonService } from 'src/app/shared/services/personas.service';

@Component({
  selector: 'app-tutors-view',
  templateUrl: './tutors-view.component.html',
  styleUrls: ['./tutors-view.component.scss'],
})
export class TutorsViewComponent implements OnInit {

  formGroup: FormGroup;
  tutor: any;

  date = new Date();
  minDateAccepted = new Date( this.date.getFullYear() - 80, this.date.getMonth(), this.date.getDay() );
  maxDateAccepted = new Date( this.date.getFullYear() - 18, this.date.getMonth(), this.date.getDay() );


  constructor(
    private formBuilder: FormBuilder,
    private personService: PersonService,
    private route: Router,
    private auth: AuthService,
    private alertService: AlertService,
    private activedRouter: ActivatedRoute,
  ) { }

  ngOnInit() {

    this.createForm();

    this.alertService.presentLoading();

    if (this.activedRouter.snapshot.paramMap.get('id')) {

      this.personService.getUser( this.activedRouter.snapshot.paramMap.get('id') )
      .subscribe((x: any) => {
        console.log(x);
        this.tutor = x.Usuario;
        this.formGroup.patchValue(x.Usuario);
        this.alertService.dismissLoading();
      });

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
    });
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
