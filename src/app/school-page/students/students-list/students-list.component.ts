import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {AuthService} from 'src/app/login/services/auth-service.service';
import {ConfirmDialogComponent} from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import {PersonService} from 'src/app/shared/services/personas.service';
import {StudentsService} from 'src/app/shared/services/students.service';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.scss'],
})
export class StudentsListComponent implements OnInit {

  cols: any[];
  students: any;
  loading = true;

  constructor(
    private studentService: StudentsService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private personService: PersonService,
    private authService: AuthService,
    private route: Router
  ) {
  }

  ngOnInit() {
    this.cols = [
      {field: 'Nombre', header: 'Nombre'},
      {field: 'Apellidos', header: 'Apellido'},
      {field: 'Telefono', header: 'Telefono'},
      {field: 'Genero', header: 'Genero'},
      {field: 'Direccion', header: 'Direccion'},
      {field: 'Fecha_De_Nacimiento', header: 'Fecha de nacimiento'},
    ];

    this.fillData();
  }

  fillData() {
    this.studentService.getAllStudents().subscribe(students => {
      this.loading = false;
      this.students = students;
    });
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

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        snack.dismiss();
        const a = document.createElement('a');
        a.click();
        a.remove();
        snack.dismiss();
        this.personService.deleteUser(id).subscribe(
          data => {
            this.snackBar.open('Elemento eliminado', 'Aceptar', {
              duration: 3000,
            });
          },
          error => {
            this.snackBar.open('ah ocurrido un error...', 'Aceptar', {
              duration: 3000,
            });
          }
        );
      } else {
        dialogRef.close();
      }
    });
  }

}
