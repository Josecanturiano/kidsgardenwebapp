import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';
import { PersonService } from 'src/app/shared/services/personas.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sections-form',
  templateUrl: './sections-form.component.html',
  styleUrls: ['./sections-form.component.scss'],
})
export class SectionsFormComponent implements OnInit {

  grades = environment.grades;
  filteredOptions: Observable<any[]>;
  filteredOptions2: Observable<any[]>;
  formGroup: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<SectionsFormComponent>,
    @ Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private personService: PersonService
    ) {}

    async ngOnInit() {
      this.createForm();

      this.filteredOptions = this.formGroup.get('Maestro').valueChanges.pipe(
        startWith(''),
        switchMap(val => {
          return this._filter(val || '');
        })
      );

      this.filteredOptions2 = this.formGroup.get('Asistente').valueChanges.pipe(
        startWith(''),
        switchMap(val => {
          return this._filter2(val || '');
        })
      );

    }

    createForm() {
      this.formGroup = this.formBuilder.group({
        Grado_ID: [null, Validators.required],
        Maestro: [null, Validators.required],
        Asistente: null,
      });
    }

    getFormIsValid(){
      return this.formGroup.status === 'VALID';
    }

    getOptionText(option) {
      console.log(option);
      return `${option.Nombre} ${option.Apellidos}`;
    }

    private _filter(value: string) {
      return this.personService.getTeachersByFullName( value, '0' ).pipe();
    }

    private _filter2(value: string) {
      return this.personService.getAssistantsByFullName( value, '0' ).pipe();
    }

    onSubmit(){
      if ( this.formGroup.status === 'VALID' ){
        this.data.Grado_ID = this.formGroup.controls.Grado_ID.value;
        this.data.Maestro = this.formGroup.controls.Maestro.value.Id_Usuario;
        this.data.Asistente = this.formGroup.controls.Asistente.value.Id_Usuario || 0;
      }
    }

    cancelar() {
      this.dialogRef.close();
    }

}
