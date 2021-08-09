import {Component, OnInit} from '@angular/core';
import {StudentsService} from 'src/app/shared/services/students.service';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AuthService} from 'src/app/login/services/auth-service.service';
import {ConfirmDialogComponent} from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import {PersonService} from 'src/app/shared/services/personas.service';
import {SectionsService} from 'src/app/shared/services/sections.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AddStudentToSectionComponent} from '../add-student-to-section/add-student-to-section.component';
import {AlertService} from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-section-view',
  templateUrl: './section-view.component.html',
  styleUrls: ['./section-view.component.scss'],
})
export class SectionViewComponent implements OnInit {

  constructor(
    private studentService: StudentsService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private personService: PersonService,
    private authService: AuthService,
    private activedRouter: ActivatedRoute,
    private alertService: AlertService,
    private route: Router,
  ) {
  }

  cols: any[];
  students: any;
  section: any;
  asistant: any;
  loading = true;
  teacher: any;


  ngOnInit() {
    this.cols = [
      {field: 'Nombre', header: 'Nombre'},
      {field: 'Apellidos', header: 'Apellido'},
      {field: 'Edad', header: 'Edad'},
      {field: 'Genero', header: 'Genero'},
      {field: 'Codigo', header: 'Codigo'},
    ];
    this.fillData();
  }

  fillData() {
    this.studentService.getAllStudentsBySection(this.activedRouter.snapshot.paramMap.get('id')).subscribe(students => {
      this.students = students;
    });

    this.studentService.getSectionInfo(this.activedRouter.snapshot.paramMap.get('id')).subscribe(section => {
      this.loading = false;
      this.teacher = section['Maestro'];
      this.asistant = section['Asistente'];
    });
  }

  openInscriptionDialog() {
    const dialogo1 = this.dialog.open((AddStudentToSectionComponent), {
      data: {
        Seccion_ID: this.activedRouter.snapshot.paramMap.get('id')
      }
    });

    dialogo1.afterClosed().subscribe(art => {
      if (art !== undefined) {
        this.enrollStudent(art);
      }
    });
  }

  enrollStudent(model) {
    this.studentService.enroll(model).subscribe(res => {
      this.alertService.success('Alumno inscrito correctamente');
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

  goToTeacherView() {
    this.route.navigate([`school/teachers/view/${this.teacher['Id_Usuario']}`]);
  }

  goToAsistantView() {
    this.route.navigate([`school/assistants/view/${this.asistant['Id_Usuario']}`]);
  }
}
