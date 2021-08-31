import {Component, Inject, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {StudentsService} from '../../services/students.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {startWith, switchMap} from 'rxjs/operators';
import {SectionsService} from '../../services/sections.service';

@Component({
  selector: 'app-modal-with-section-combo',
  templateUrl: './asign-activity-to-section.component.html',
  styleUrls: ['./asign-activity-to-section.component.scss'],
})
export class AsignActivityToSectionComponent implements OnInit {

  @Input() public functionToExecute: () => void;
  @Input() public gradeId: number;
  @Input() public sectionToExclude: Array<number>;

  formGroup: FormGroup;
  filteredOptions: any;
  sections: any;
  actualDate = new Date();

  constructor(
    private studentService: StudentsService,
    public dialogRef: MatDialogRef<AsignActivityToSectionComponent>,
    @ Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private sectionService: SectionsService
  ) {
  }

  ngOnInit() {
    this.createForm();
  }

  getFormIsValid() {
    return this.formGroup.status === 'VALID';
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      FechaInicio: [null, Validators.required],
      FechaFin: [null, Validators.required]
    });
  }

  onSubmit() {
    if (this.formGroup.status === 'VALID') {
      this.data.FechaInicio = this.formGroup.controls.FechaInicio.value;
      this.data.FechaFin = this.formGroup.controls.FechaFin.value;
      this.data.isValid = true;
    }
  }

  cancelar() {
    this.dialogRef.close();
  }

  getDateWithFourHour(value: Date) {
    if (!value) {
      return new Date();
    }
    const date = new Date(value.getTime());
    const actualDate = new Date();
    date.setHours(date.getHours() + 4);
    return date.getTime() >= actualDate.getTime() ? date : actualDate;
  }

  onStartDateChange($event: Event) {
    if (this.f.FechaInicio.value.getTime() >= this.f.FechaFin.value.getTime()) {
      this.f.FechaFin.setValue(this.getDateWithFourHour(this.f.FechaInicio.value));
    }
  }

  get f() {
    return this.formGroup.controls;
  }

  getOptionText(section) {
    return section ? section.Nombre : null;
  }
}
