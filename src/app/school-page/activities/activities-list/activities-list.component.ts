import {Component, OnInit} from '@angular/core';
import {ActivitiesService} from '../../../shared/services/activities.service';
import {ConfirmDialogComponent} from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AlertService} from '../../../shared/services/alert.service';

@Component({
  selector: 'app-activities-list',
  templateUrl: './activities-list.component.html',
  styleUrls: ['./activities-list.component.scss'],
})
export class ActivitiesListComponent implements OnInit {
  cols: any;
  loading: any;
  activities: any;

  constructor(
    private activitiesService: ActivitiesService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private alertService: AlertService
  ) {
  }

  ngOnInit() {
    this.cols = [
      {field: 'Titulo', header: 'Titulo'},
      {field: 'Descripcion', header: 'Descripción'},
      {field: 'Mecanica', header: 'Mecánica'},
      {field: 'Estado', header: 'Estado'},
    ];

    this.fillData();
  }

  private fillData() {
    this.loading = true;
    this.activitiesService.getAllActivities().subscribe((x: any) => {
      this.loading = false;
      this.activities = this.getUniqueActivities( x.filter((y: any) => {
        return y.Institucion_ID > 0;
      }));
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

  openDialog(id) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: 'Esta seguro que desea eliminar este elemento ?',
        buttonText: {
          ok: 'Si',
          cancel: 'No'
        }
      }
    });
    const snack = this.snackBar;

    dialogRef.afterClosed().subscribe(async (confirmed: boolean) => {
      if (confirmed) {
        snack.dismiss();
        const a = document.createElement('a');
        a.click();
        a.remove();
        snack.dismiss();

        await this.alertService.presentLoading();

        this.activitiesService.deleteActivity(id).subscribe(
          (res: any) => {
            this.alertService.dismissLoading();
            this.snackBar.open('Elemento eliminado', 'Aceptar', {
              duration: 3000,
            });
          },
          (err: any) => {
            this.alertService.dismissLoading();
            this.alertService.error(JSON.stringify(err));
          }
        );
      } else {
        dialogRef.close();
      }
    });
  }
}
