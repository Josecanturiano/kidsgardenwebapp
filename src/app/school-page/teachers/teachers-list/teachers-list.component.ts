import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { PersonService } from 'src/app/shared/services/personas.service';
import { TeachersService } from 'src/app/shared/services/teachers.service';

@Component({
  selector: 'app-teachers-list',
  templateUrl: './teachers-list.component.html',
  styleUrls: ['./teachers-list.component.scss'],
})
export class TeachersListComponent implements OnInit {
  cols: any[];
  teachers: any;
  loading = true;
  constructor(
    private teachersService: TeachersService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private personService: PersonService
    ) { }

  ngOnInit() {

    this.cols = [
      { field: 'Nombre', header: 'Nombre' },
      { field: 'Apellidos', header: 'Apellido' },
      { field: 'Telefono', header: 'Telefono' },
      { field: 'Genero', header: 'Genero' },
      { field: 'Direccion', header: 'Direccion' },
      { field: 'Fecha_De_Nacimiento', header: 'Fecha de nacimiento' },
    ];

    this.teachersService.getAllTeachers().subscribe( teachers => {
      this.loading = false;
      this.teachers = teachers
    } )
    
  }  

  openDialog( id ) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent,{
      data:{
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
        this.personService.deleteUser( id ).subscribe( 
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
        )        
      }else {
        dialogRef.close();
      }
    });
  }
  
}
