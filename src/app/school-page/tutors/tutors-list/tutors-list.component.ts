import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ConfirmDialogComponent} from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import {PersonService} from 'src/app/shared/services/personas.service';

@Component({
  selector: 'app-tutors-list',
  templateUrl: './tutors-list.component.html',
  styleUrls: ['./tutors-list.component.scss'],
})
export class TutorsListComponent implements OnInit {

  cols: any[];
  tutors: any[];
  loading = true;

  constructor(
    private personService: PersonService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit() {
    this.cols = [
      {field: 'Nombre', header: 'Nombre'},
      {field: 'Apellidos', header: 'Apellido'},
      {field: 'Genero', header: 'Genero'},
      {field: 'Direccion', header: 'Direccion'},
      {field: 'Fecha_De_Nacimiento', header: 'Fecha de nacimiento'},
    ];

    this.personService.getPersons().subscribe(
      (x: any[]) => {
        this.loading = false;
        this.tutors = x;
      },
      (error) => {
        console.log(error);
      });
  }

  openDialog() {
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

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        snack.dismiss();
        const a = document.createElement('a');
        a.click();
        a.remove();
        snack.dismiss();
        this.snackBar.open('Elemento eliminado', 'Aceptar', {
          duration: 3000,
        });
      } else {
        dialogRef.close();
      }
    });
  }


}
