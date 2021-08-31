import {Component, OnInit} from '@angular/core';
import {ActivitiesService} from '../../../shared/services/activities.service';

@Component({
  selector: 'app-teachers-activities',
  templateUrl: './teachers-activities.component.html',
  styleUrls: ['./teachers-activities.component.scss'],
})
export class TeachersActivitiesComponent implements OnInit {

  cols: any;
  loading: any;
  activities: any;

  constructor(
    private activitiesService: ActivitiesService
  ) {
  }

  ngOnInit() {
    this.cols = [
      {field: 'name', header: 'Nombre'},
      {field: 'start_date', header: 'Fecha de inicio'},
      {field: 'end_date', header: 'Fecha de entrega'},
      {field: 'total_of_students', header: 'Total de participantes'},
      {field: 'total_of_entregas', header: 'Total de entregas'},
    ];

    this.fillData();
  }

  private fillData() {
    this.loading = true;
    this.activitiesService.getActivitiesBySectionForTeacher().subscribe(x => {
      this.loading = false;
      this.activities = x;
    } );
  }

}
