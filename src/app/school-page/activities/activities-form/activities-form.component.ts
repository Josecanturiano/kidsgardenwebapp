import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SectionsService} from '../../../shared/services/sections.service';
import {environment} from '../../../../environments/environment';
import {SchoolService} from '../../../shared/services/school.service';
import {AlertService} from '../../../shared/services/alert.service';
import {ActivitiesService} from '../../../shared/services/activities.service';
import {Router} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-activities-form',
  templateUrl: './activities-form.component.html',
  styleUrls: ['./activities-form.component.scss'],
})
export class ActivitiesFormComponent implements OnInit {

  formGroup: FormGroup;
  submitted: boolean;
  competencias: any;
  mecanicas: any;
  grades = environment.grades;
  imgs = [];
  objetives: any;

  constructor(
    private formBuilder: FormBuilder,
    private sectionsService: SectionsService,
    private schoolService: SchoolService,
    private alertService: AlertService,
    private activitiesService: ActivitiesService,
    private route: Router,
    private location: Location,
  ) {
  }

  ngOnInit() {
    this.createForm();

    this.schoolService.getCompetencies().subscribe(x => {
      this.competencias = x;
    });

    this.schoolService.getMecanicas().subscribe(x => {
      this.mecanicas = x;
    });

    this.schoolService.getObjetives().subscribe((x: any) => {
      this.objetives = x;
    });
  }

  private createForm() {
    this.formGroup = this.formBuilder.group({
      Titulo: [null, Validators.required],
      Descripcion: [null, Validators.required],
      Grado_ID: [null, Validators.required],
      Competencia_ID: [null, Validators.required],
      Mecanica_ID: [null, Validators.required],
      objetivos_id: [null, Validators.required]
    });
  }

  async onSubmit() {
    this.submitted = true;

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
          this.alertService.success('la actividad se creo correctamente');
          this.route.navigate(['school/activities']);
        },
        (error) => {
          this.alertService.dismissLoading();
          this.alertService.error('Hubo un error');
        });
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

  get f() {
    return this.formGroup.controls;
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
}
