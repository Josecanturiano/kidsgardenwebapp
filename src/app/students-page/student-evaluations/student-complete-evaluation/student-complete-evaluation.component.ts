import {Component, OnInit} from '@angular/core';
import {ActivitiesService} from '../../../shared/services/activities.service';
import {ActivatedRoute} from '@angular/router';
import {AlertService} from '../../../shared/services/alert.service';

@Component({
  selector: 'app-student-complete-evaluation',
  templateUrl: './student-complete-evaluation.component.html',
  styleUrls: ['./student-complete-evaluation.component.scss'],
})
export class StudentCompleteEvaluationComponent implements OnInit {

  evaluation = null;

  constructor(
    private evaluationService: ActivitiesService,
    private activatedRouter: ActivatedRoute,
    private alertService: AlertService
  ) {
  }

  ngOnInit() {
    this.getEvaluation();
  }

  getEvaluation() {
    if (this.activatedRouter.snapshot.paramMap.get('id')) {
      this.evaluationService.getEvaluationById(this.activatedRouter.snapshot.paramMap.get('id')).subscribe(evaluation => {
        this.evaluation = evaluation[0];
      });
    }
  }

  getQuestions() {
    if (this.evaluation) {
      console.log(JSON.parse(this.evaluation.ContenidoJSON));
      return JSON.parse(this.evaluation.ContenidoJSON);
    }
  }

  selectOption(i, j) {
    const actual = JSON.parse(this.evaluation.ContenidoJSON);
    actual[i].answers[j].selected = !actual[i].answers[j].selected;
    this.evaluation.ContenidoJSON = JSON.stringify(actual);
  }

  evaluate() {
    const actual = JSON.parse(this.evaluation.ContenidoJSON);
    const cantidad = actual.length;
    const trueAnswers = this.getCorrectsAnswers(actual);
    const calification = ( cantidad / 100 ) * trueAnswers;
    this.alertService.success( 'tu calificacion es :' + calification );
  }

  getCorrectsAnswers(arr) {
    let count = 0;
    arr.forEach(x => {
      if (this.hasTrueASserts(x)) {
        count++;
      }
    });
    return count;
  }

  hasTrueASserts(data) {
    let result = false;
    data.answers.forEach(answer => {
      if (answer.selected && answer.isCorrectAsnwer) {
        result = true;
      }
    });
    return result;
  }
}
