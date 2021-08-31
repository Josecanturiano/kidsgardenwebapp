import {Component, OnInit} from '@angular/core';
import {ActivitiesService} from '../../../shared/services/activities.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {environment} from '../../../../environments/environment';
import {AlertService} from '../../../shared/services/alert.service';
import {ActivatedRoute, Router} from '@angular/router';
import {SchoolService} from '../../../shared/services/school.service';
import {AddStudentToSectionComponent} from '../../sections/add-student-to-section/add-student-to-section.component';
import {MatDialog} from '@angular/material/dialog';
import {AsignActivityToSectionComponent} from '../../../shared/components/asign-activity-to-section/asign-activity-to-section.component';
import {AuthService} from '../../../login/services/auth-service.service';

@Component({
  selector: 'app-activity-detail',
  templateUrl: './activity-detail.component.html',
  styleUrls: ['./activity-detail.component.scss'],
})
export class ActivityDetailComponent implements OnInit {

  formGroup: FormGroup;
  submitted: boolean;
  competencias: any;
  mecanicas: any;
  readonly = true;
  grades = environment.grades;
  imgs = [];
  current: any;
  objetives: any;
  cols: any;
  sections = [];

  constructor(
    private activityService: ActivitiesService,
    private alertService: AlertService,
    private activedRouter: ActivatedRoute,
    private formBuilder: FormBuilder,
    private activitiesService: ActivitiesService,
    private schoolService: SchoolService,
    private route: Router,
    private dialog: MatDialog,
    public authService: AuthService
  ) {
  }

  async ngOnInit() {

    this.cols = [
      {field: 'name', header: 'Sección'},
      {field: 'start_date', header: 'Fecha de inicio'},
      {field: 'end_date', header: 'Fecha de entrega'},
      {field: 'total_of_students', header: 'Total de participantes'},
      {field: 'total_of_entregas', header: 'Total de entregas'},
    ];

    this.createForm();

    await this.alertService.presentLoading();

    await this.schoolService.getCompetencies().toPromise().then(x => this.competencias = x);

    await this.schoolService.getMecanicas().toPromise().then(x => this.mecanicas = x);

    await this.schoolService.getObjetives().toPromise().then((x: any) => this.objetives = x);

    // await this.activitiesService.getActivitySections().toPromise().then( (x: any) => this.sections = x );

    if (this.activedRouter.snapshot.paramMap.get('id')) {
      this.activitiesService.getActivityById(this.activedRouter.snapshot.paramMap.get('id')).subscribe(x => {
        this.current = this.getUniqueActivities(x);
        console.log(this.current);
        this.patchValues();
        this.alertService.dismissLoading();
      });
    }
  }

  getUniqueActivities(activities) {
    const resArr = [];
    activities.filter((item) => {
      const i = resArr.findIndex((y: any) => y.ID_Actividad === item.ID_Actividad);
      if (i <= -1) {
        item.objetivos_id = [item.ID_Objetivo];
        resArr.push(item);
      } else {
        const a = resArr.findIndex((y: any) => y.ID_Actividad === item.ID_Actividad);
        resArr[a].objetivos_id.push(item.ID_Objetivo);
      }
      return null;
    });
    return resArr[0];
  }

  private patchValues() {
    this.formGroup.get('Titulo').setValue(this.current.Titulo);
    this.formGroup.get('Descripcion').setValue(this.current.Descripcion);
    this.formGroup.get('Competencia_ID').setValue(this.current.ID_Competencia);
    this.formGroup.get('Grado_ID').setValue(this.current.ID_Grado);
    this.formGroup.get('Mecanica_ID').setValue(this.current.ID_Mecanica);
    this.formGroup.get('FechaInicio').setValue(new Date(this.current.FechaInicio));
    this.formGroup.get('FechaFin').setValue(new Date(this.current.FechaFin));
    this.formGroup.get('objetivos_id').setValue(this.current.objetivos_id);
    this.imgs = JSON.parse(this.current.Contenido_JSON);
    this.formGroup.disable();
  }

  async onSubmit() {
    this.submitted = true;

    if (!this.readonly) {
      if (this.formGroup.status !== 'VALID') {
        this.alertService.error('Complete todos los campos');
      } else {
        const activity = this.formGroup.value;
        activity.Estado = 1;
        activity.Contenido_Json = JSON.stringify(this.imgs);

        await this.alertService.presentLoading();
        this.activitiesService.createActivity(activity).subscribe(
          (data) => {
            this.alertService.dismissLoading();
            this.alertService.success('la actividad se modifico correctamente');
            this.route.navigate(['school/activities']);
          },
          (error) => {
            this.alertService.dismissLoading();
            this.alertService.error('Hubo un error');
          });
      }
    }
  }

  private createForm() {
    this.formGroup = this.formBuilder.group({
      Titulo: [null, Validators.required],
      Descripcion: [null, Validators.required],
      Grado_ID: [null, Validators.required],
      Competencia_ID: [null, Validators.required],
      Mecanica_ID: [null, Validators.required],
      FechaInicio: [null, Validators.required],
      FechaFin: [null, Validators.required],
      objetivos_id: [null, Validators.required]
    });
  }

  formGroupToggle() {
    this.readonly = !this.readonly;
    this.readonly ? this.formGroup.disable() : this.formGroup.enable();
    if (this.readonly) {
      this.patchValues();
    }
  }

  addNewImg(e: File[]) {
    const file = e[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      this.imgs.push(reader.result.toString());
    };
    reader.readAsDataURL(file);
  }

  removeImg(i) {
    this.imgs.splice(i, 1);
  }

  getDateWithFourHour(value: Date) {
    if (!value) {
      return new Date();
    }
    const date = new Date(value.getTime());
    date.setHours(date.getHours() + 4);
    return date;
  }

  onStartDateChange($event: Event) {
    if (this.f.FechaInicio.value.getTime() >= this.f.FechaFin.value.getTime()) {
      this.f.FechaFin.setValue(this.getDateWithFourHour(this.f.FechaInicio.value));
    }
  }

  get f() {
    return this.formGroup.controls;
  }

  asingActivityToSection() {
    const dialogo1 = this.dialog.open((AsignActivityToSectionComponent), {
      data: {
        Docente_ID: this.authService.userId,
        Seccion_ID: this.authService.currentTeacher.Seccion_ID,
        Actividad_ID: this.current.ID_Actividad,
        FechaInicio: null,
        FechaFin: null,
        isValid: false
      },
      width: '500px'
    });

    dialogo1.afterClosed().subscribe(art => {
      if (art !== undefined && art.isValid === true) {
        delete art.isValid;
        this.activitiesService.asignActivityToSection(art).toPromise().then(() => {
          this.alertService.success('Se asignó la actividad a la sección correctamente');
        });
      }
    });
  }
}
