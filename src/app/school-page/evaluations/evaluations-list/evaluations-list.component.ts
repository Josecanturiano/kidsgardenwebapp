import {Component, OnInit} from '@angular/core';
import {AlertService} from 'src/app/shared/services/alert.service';
import {ActivitiesService} from '../../../shared/services/activities.service';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ConfirmDialogComponent} from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import {isArray} from 'rxjs/internal-compatibility';

@Component({
  selector: 'app-evaluations-list',
  templateUrl: './evaluations-list.component.html',
  styleUrls: ['./evaluations-list.component.scss'],
})
export class EvaluationsListComponent implements OnInit {
  cols: any;
  loading: any;
  evaluations = [];

  constructor(
    private alertService: AlertService,
    private evaluationsService: ActivitiesService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {
  }

  ngOnInit() {
    this.cols = [
      {field: 'Evaluacion', header: 'Nombre'},
      {field: 'Descripcion', header: 'Descripción'},
      {field: 'Seccion', header: 'Sección'},
      {field: 'Grado', header: 'Grado'},
      {field: 'FechaInicio', header: 'Fecha de inicio'},
      {field: 'FechaFin', header: 'Fecha de entrega'},
      {field: 'Competencia', header: 'Competencia'},
    ];

    this.getEvaluations();
  }

  getEvaluations() {
    this.loading = true;
    this.evaluationsService.getAllEvaluations().subscribe((x: any) => {
      this.loading = false;
      if (isArray(x)) {
        this.evaluations = x;
      }
    });
  }

  alert() {
    this.alertService.success('alert');
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

        this.evaluationsService.deleteEvaluation(id).subscribe(
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
