import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SectionsService} from '../../../shared/services/sections.service';

@Component({
  selector: 'app-activities-form',
  templateUrl: './activities-form.component.html',
  styleUrls: ['./activities-form.component.scss'],
})
export class ActivitiesFormComponent implements OnInit {

  formGroup: FormGroup;
  submitted: boolean;
  sections: any;

  constructor(private formBuilder: FormBuilder, private sectionsService: SectionsService
  ) {
  }

  ngOnInit() {
    this.createForm();

    this.sectionsService.getSections().subscribe((sections: any) => {
      this.sections = sections;
    });
  }

  private createForm() {
    this.formGroup = this.formBuilder.group({
      title: [null, Validators.required],
      description: [null, Validators.required],
      sectionId: [null, Validators.required],
      start_datetime: [null, Validators.required],
      end_datetime: [null, Validators.required],
    });
  }

  onSubmit() {
    this.submitted = true;
  }

  get f() {
    return this.formGroup.controls;
  }

  getDateWithOneHour(value: Date) {
    if ( !value ){
      return new Date();
    }
    value.setHours(value.getHours() + 1);
    return value;
  }
}
