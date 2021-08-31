import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {SectionsService} from '../../../shared/services/sections.service';
import {AlertService} from '../../../shared/services/alert.service';
import {SchoolService} from '../../../shared/services/school.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ActivitiesService} from '../../../shared/services/activities.service';

@Component({
  selector: 'app-evaluation-detail',
  templateUrl: './evaluation-detail.component.html',
  styleUrls: ['./evaluation-detail.component.scss'],
})
export class EvaluationDetailComponent implements OnInit {

  formGroup: FormGroup;
  sections: any;
  answerImgTemplate = 'https://www.clipartmax.com/png/full/122-1223950_bulb-idea-light-bulb-question-mark-thinking-icon-light-bulb-question-mark.png';
  submitted: boolean;
  competencias: any;
  readonly = true;
  cols: any;
  loading: any;
  evaluations: any;

  constructor(
    private formBuilder: FormBuilder,
    private sectionsService: SectionsService,
    private alertService: AlertService,
    private schoolService: SchoolService,
    private route: Router,
    private activitiesService: ActivitiesService,
    private activedRouter: ActivatedRoute
  ) {
  }

  async ngOnInit() {
    this.createForm();

    this.sectionsService.getSections().subscribe(sections => {
      this.sections = sections;
    });

    this.schoolService.getCompetencies().subscribe(x => {
      this.competencias = x;
    });

    this.cols = [
      {field: 'name', header: 'Nombre'},
      {field: 'start_date', header: 'Fecha de inicio'},
      {field: 'end_date', header: 'Fecha de entrega'},
      {field: 'total_of_students', header: 'Total de participantes'},
      {field: 'total_of_entregas', header: 'Total de entregas'}
    ];

    if (this.activedRouter.snapshot.paramMap.get('id')) {
      await this.alertService.presentLoading();
      this.activitiesService.getEvaluationById( this.activedRouter.snapshot.paramMap.get('id') ).subscribe(x => {
        this.setFormData(x[0]);
        this.alertService.dismissLoading();
      });
    }

    // this.activitiesService.getEvaluationResults(  ).suscribe( result => {
    //   this.evaluations = result;
    // } );
  }

  setFormData(data) {
    this.formGroup.get('Nombre').setValue(data.Evaluacion);
    this.formGroup.get('Descripcion').setValue(data.Descripcion);
    this.formGroup.get('Competencia_ID').setValue(data.Competencia_ID);
    this.formGroup.get('Seccion_ID').setValue(data.ID_Seccion);

    this.formGroup.get('FechaInicio').setValue(new Date(data.FechaInicio));
    this.formGroup.get('FechaFin').setValue(new Date(data.FechaFin));

    JSON.parse(data.ContenidoJSON).forEach((element) => {
      (this.formGroup.get('questions') as FormArray).push(
        this.formBuilder.group({
          question: [element.question, Validators.required],
          answers: this.formBuilder.array(element.answers.map((answer) => {
            return this.formBuilder.group({
              description: [answer.description, Validators.required],
              isCorrectAnswer: answer.isCorrectAnswer,
              img: answer.img
            });
          }), this.haveMoreThanOneValidAnswer()),
        })
      );
    });
    this.formGroup.disable();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      Nombre: [null, Validators.required],
      Descripcion: [null, Validators.required],
      Competencia_ID: [null, Validators.required],
      Seccion_ID: [null, Validators.required],
      FechaInicio: [null, Validators.required],
      FechaFin: [null, Validators.required],
      questions: this.formBuilder.array([], Validators.required),
    });
  }


  public convertFileToBase64(e: File[], group) {
    console.log(group);
    const file = e[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      group.controls.img.setValue(reader.result);
      // this.answerImgTemplate = reader.result.toString();
    };
    reader.readAsDataURL(file);
  }

  get f() {
    return this.formGroup.controls;
  }

  fq(i) {
    return this.formGroup.get('questions')[i];
  }

  fqa(qi, ai) {
    return this.fq(qi).get('answers')[ai];
  }

  get questions() {
    return this.formGroup.controls.questions as FormArray;
  }

  addNewQuestion() {
    this.questions.push(this.getNewQuestionsControls());
  }

  removeQuestion(i) {
    this.questions.removeAt(i);
  }

  getNewQuestionsControls() {
    return this.formBuilder.group({
      question: ['', Validators.required],
      answers: this.formBuilder.array([], this.haveMoreThanOneValidAnswer()),
    });
  }

  getAnswersForQuestion(question) {
    return question.controls.answers.controls;
  }

  addAnswerForQuestion(i) {
    (this.questions.controls[i].get('answers') as FormArray).push(this.getAnswerForQuestion());
  }

  removeAnswerForQuestion(i, index) {
    (this.questions.controls[i].get('answers') as FormArray).removeAt(index);
  }

  getAnswerForQuestion() {
    return this.formBuilder.group({
      description: ['', Validators.required],
      isCorrectAnswer: false,
      img: this.answerImgTemplate
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.formGroup.status !== 'VALID') {
      this.alertService.error('Complete todos los campos');
    } else {

      const evaluation = this.formGroup.value;
      evaluation.Estado = 2;
      evaluation.ContenidoJSON = JSON.stringify(evaluation.questions);

      delete evaluation.answers;
      delete evaluation.questions;

      this.alertService.presentLoading();
      this.activitiesService.updateEvaluation(evaluation).subscribe(
        (data) => {
          console.log(data);
          this.alertService.dismissLoading();
          this.alertService.success('La evaluación se modifico de manera correcta !');
          this.route.navigate(['school/evaluations']);
        },
        (error) => {
          console.log(error);
          this.alertService.dismissLoading();
        });
    }

  }

  getDateWithFourHour(value: Date) {
    if (!value || !(value instanceof Date)) {
      return new Date();
    }
    const date = new Date(value.getTime());
    date.setHours(date.getHours() + 4);
    return date;
  }

  haveMoreThanOneValidAnswer(): ValidatorFn {
    return (formArray: FormArray): { [key: string]: any } | null => {
      let valid = false;
      formArray.controls.forEach((x: FormGroup) => {
        valid = valid || x.value.isCorrectAnswer === true;
      });
      return valid ? null : {error: 'Debe haber almenos una respuesta correcta'};
    };

  }

  onStartDateChange($event: Event) {
    if (this.f.FechaInicio.value.getTime() >= this.f.FechaFin.value.getTime()) {
      this.f.FechaFin.setValue(this.getDateWithFourHour(this.f.FechaInicio.value));
    }
  }

  formGroupToggle() {
    this.readonly = !this.readonly;
    this.readonly ? this.formGroup.disable() : this.formGroup.enable();
  }
}
