import {Component, OnInit} from '@angular/core';
import {StudentsService} from '../../../shared/services/students.service';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {PersonService} from '../../../shared/services/personas.service';
import {AuthService} from '../../../login/services/auth-service.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertService} from '../../../shared/services/alert.service';
import {AddStudentToSectionComponent} from '../../../school-page/sections/add-student-to-section/add-student-to-section.component';
import {ConfirmDialogComponent} from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import {TeachersService} from '../../../shared/services/teachers.service';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-teacher-section',
  templateUrl: './teacher-section.component.html',
  styleUrls: ['./teacher-section.component.scss'],
})
export class TeacherSectionComponent implements OnInit {

  constructor(
    private studentService: StudentsService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private personService: PersonService,
    private teacherService: TeachersService,
    private authService: AuthService,
    private activedRouter: ActivatedRoute,
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
    this.studentService.getAllStudentsBySection( this.authService.currentTeacher.Seccion_ID ).subscribe(students => {
      this.students = students;
      this.loading = false;
    });
  }

}
