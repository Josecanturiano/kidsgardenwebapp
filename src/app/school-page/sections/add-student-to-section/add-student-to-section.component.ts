import { Component, OnInit, Inject } from '@angular/core';
import { StudentsService } from 'src/app/shared/services/students.service';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-add-student-to-section',
  templateUrl: './add-student-to-section.component.html',
  styleUrls: ['./add-student-to-section.component.scss'],
})
export class AddStudentToSectionComponent implements OnInit {

  formGroup: FormGroup;
  filteredOptions: any;
  students: any;
  constructor(
    private studentService: StudentsService,
    public dialogRef: MatDialogRef<AddStudentToSectionComponent>,
    @ Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.createForm();
    this.studentService.getStudentsAvailablesForSection(this.data.Seccion_ID).subscribe( data => {
      console.log( data );
    } );

    this.students = this.studentService.getStudentsAvailablesForSection(this.data.Seccion_ID);

    this.filteredOptions = this.formGroup.get('ID_Estudiante').valueChanges.pipe(
      startWith(''),
      switchMap(val => {
        return this._filter(val || '');
      })
    );

  }

  getOptionText(option) {
    console.log(option);
    return `${option.Nombre} ${option.Apellidos}`;
  }

  private _filter(value: string) {
    const data = this.students ? this.students : [];
    return data.filter( student => {
      const fullname = student.Nombre + ' ' + student.Apellidos;
      return fullname.toLowerCase().indexOf(value.toLowerCase()) > -1;
    });
  }

  getFormIsValid(){
    return this.formGroup.status == 'VALID';
  }

  createForm(){
    this.formGroup = this.formBuilder.group({
      ID_Estudiante: [null, Validators.required],
    });
  }

  onSubmit(){
    if ( this.formGroup.status == 'VALID' ){
      this.data.ID_Estudiante = this.formGroup.controls.ID_Estudiante.value.Id_Usuario;
    }
  }

  cancelar() {
    this.dialogRef.close();
  }

}
