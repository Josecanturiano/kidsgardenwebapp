import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-evaluations-list',
  templateUrl: './evaluations-list.component.html',
  styleUrls: ['./evaluations-list.component.scss'],
})
export class EvaluationsListComponent implements OnInit {

  constructor( private alertService: AlertService ) { }

  ngOnInit() {}

  alert(){
    this.alertService.success( 'alert' );
  }

}
