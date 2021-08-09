import {Component, ComponentFactoryResolver, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {AlertService} from 'src/app/shared/services/alert.service';
import {SectionsService} from 'src/app/shared/services/sections.service';
import {SchoolService} from '../../../shared/services/school.service';
import {ActivitiesService} from '../../../shared/services/activities.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-evaluation-form',
  templateUrl: './evaluation-form.component.html',
  styleUrls: ['./evaluation-form.component.scss'],
})
export class EvaluationFormComponent implements OnInit {

  formGroup: FormGroup;
  sections: any;
  answerImgTemplate = 'https://www.clipartmax.com/png/full/122-1223950_bulb-idea-light-bulb-question-mark-thinking-icon-light-bulb-question-mark.png';
  submitted: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private sectionsService: SectionsService,
    private alertService: AlertService,
    private schoolService: SchoolService,
    private route: Router,
    private activitiesService: ActivitiesService
  ) {
  }

  ngOnInit() {
    this.createForm();

    this.sectionsService.getSections().subscribe(sections => {
      this.sections = sections;
    });
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      Nombre: [null, Validators.required],
      Descripcion: [null, Validators.required],
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
      evaluation.Estado = 1;
      evaluation.ContenidoJSON = JSON.stringify(evaluation.questions);

      delete evaluation.answers;
      delete evaluation.questions;

      this.alertService.presentLoading();
      this.activitiesService.createEvaluation(evaluation).subscribe(
        (data) => {
          console.log(data);
          this.alertService.dismissLoading();
          this.alertService.success('La evaluación se creo de manera correcta !');
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
}
