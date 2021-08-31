import {Component, OnInit} from '@angular/core';
import {ActivitiesService} from '../../../shared/services/activities.service';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogComponent} from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import {Router} from '@angular/router';
import {VoiceService} from '../../../shared/services/voice.service';
import {AlertService} from '../../../shared/services/alert.service';
import {AuthService} from '../../../login/services/auth-service.service';
import {isArray} from 'rxjs/internal-compatibility';

@Component({
  selector: 'app-student-evaluation-grid',
  templateUrl: './student-evaluation-grid.component.html',
  styleUrls: ['./student-evaluation-grid.component.scss'],
})
export class StudentEvaluationGridComponent implements OnInit {

  availableEvaluations = [];

  constructor(
    private evaluationsService: ActivitiesService,
    private dialog: MatDialog,
    private router: Router,
    private voiceService: VoiceService,
    private alertService: AlertService,
    private authService: AuthService
  ) {
  }

  async ngOnInit() {
    await this.getAvailableEvaluations();
  }

  async getAvailableEvaluations() {
    await this.alertService.presentLoading();
    this.evaluationsService.getEvaluationsBySection(this.authService.currentStudent.estudiante.Seccion_ID).subscribe((evaluations) => {
      if (isArray(evaluations)) {
        this.availableEvaluations = evaluations;
      }
      this.alertService.dismissLoading();
    });
  }

  complete(id) {
    // this.voiceService.speak( 'Esta seguro que desea iniciar esta evaluación ?' );
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: 'Esta seguro que desea iniciar esta evaluación ?',
        buttonText: {
          ok: 'Si',
          cancel: 'No'
        }
      }
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        const a = document.createElement('a');
        a.click();
        a.remove();
        this.router.navigate(['students/evaluations/completeEvaluation/' + id]);
      } else {
        dialogRef.close();
      }
    });
  }
}
