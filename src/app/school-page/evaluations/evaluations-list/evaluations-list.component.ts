import {Component, OnInit} from '@angular/core';
import {AlertService} from 'src/app/shared/services/alert.service';
import {ActivitiesService} from '../../../shared/services/activities.service';

@Component({
  selector: 'app-evaluations-list',
  templateUrl: './evaluations-list.component.html',
  styleUrls: ['./evaluations-list.component.scss'],
})
export class EvaluationsListComponent implements OnInit {
  cols: any;
  loading: any;
  evaluations: any;

  constructor(private alertService: AlertService, private evaluationsService: ActivitiesService) {
  }

  ngOnInit() {
    this.cols = [
      {field: 'name', header: 'Nombre'},
      {field: 'start_date', header: 'Fecha de inicio'},
      {field: 'end_date', header: 'Fecha de entrega'},
      {field: 'total_of_students', header: 'Total de participantes'},
      {field: 'total_of_entregas', header: 'Total de entregas'},
    ];

    // this.getEvaluations();
  }

  getEvaluations() {
    this.evaluationsService.getAllEvaluations().subscribe(x => {
      this.evaluations = x;
    });
  }

  alert() {
    this.alertService.success('alert');
  }

}
