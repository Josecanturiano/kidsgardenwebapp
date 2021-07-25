import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-activities-list',
  templateUrl: './activities-list.component.html',
  styleUrls: ['./activities-list.component.scss'],
})
export class ActivitiesListComponent implements OnInit {
  cols: any;
  loading: any;
  activities: any;

  constructor() { }

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

  private fillData() {}
}
