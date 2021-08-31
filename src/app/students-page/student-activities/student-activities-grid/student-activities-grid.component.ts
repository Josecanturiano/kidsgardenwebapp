import {Component, OnInit} from '@angular/core';
import {ActivitiesService} from '../../../shared/services/activities.service';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {VoiceService} from '../../../shared/services/voice.service';
import {AlertService} from '../../../shared/services/alert.service';
import {AuthService} from '../../../login/services/auth-service.service';
import {isArray} from 'rxjs/internal-compatibility';
import {ConfirmDialogComponent} from '../../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-student-activities-grid',
  templateUrl: './student-activities-grid.component.html',
  styleUrls: ['./student-activities-grid.component.scss'],
})
export class StudentActivitiesGridComponent implements OnInit {

  activities = [];

  constructor(
    private activitiesService: ActivitiesService,
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
    this.activitiesService.getActivitiesByStudent().subscribe((activities) => {
      if (isArray(activities)) {
        this.activities = this.getUniqueActivities( activities );
      }
      this.alertService.dismissLoading();
    });
  }

  getUniqueActivities(activities) {
    const resArr = [];
    activities.filter((item) => {
      const i = resArr.findIndex((y: any) => y.ID_Actividad === item.ID_Actividad);
      if (i <= -1) {
        item.objetivos_id = [item.ID_Objetivo];
        resArr.push(item);
      } else {
        const a = resArr.findIndex((y: any) => y.ID_Actividad === item.ID_Actividad);
        resArr[a].objetivos_id.push(item.ID_Objetivo);
      }
      return null;
    });
    return resArr;
  }

  complete(id) {
    this.voiceService.speak( 'Esta seguro que desea iniciar esta evaluación ?' );
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: 'Esta seguro que desea iniciar esta actividad ?',
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
        this.router.navigate(['students/activities/completeActivity/' + id]);
      } else {
        dialogRef.close();
      }
    });
  }

}
