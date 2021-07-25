import {Component, ComponentFactoryResolver, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AlertService} from 'src/app/shared/services/alert.service';
import {SectionsService} from 'src/app/shared/services/sections.service';

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
    private sectionsService: SectionsService
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
      title: [null, Validators.required],
      description: [null, Validators.required],
      sectionId: [null, Validators.required],
      start_datetime: [null, Validators.required],
      end_datetime: [null, Validators.required],
      questions: this.formBuilder.array([])
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

  getImageForAnswer(answer) {
    return answer.controls.img.value || this.answerImgTemplate;
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
      answers: this.formBuilder.array([]),
    });
  }

  getAnswersForQuestion(question) {
    return question.controls.answers.controls;
  }

  addAnswerForQuestion(i) {
    (this.questions.controls[i].get('answers') as FormArray).push(this.getAnswerForQuestion());
  }

  getAnswerForQuestion() {
    return this.formBuilder.group({
      description: ['', Validators.required],
      isCorrectAnswer: [false, Validators.required],
      img: ''
    });
  }

  onSubmit() {
    this.submitted = true;
  }

  getDateWithOneHour(value: Date) {
    if ( !value ){
      return new Date();
    }
    value.setHours(value.getHours() + 1);
    return value;
  }
}
