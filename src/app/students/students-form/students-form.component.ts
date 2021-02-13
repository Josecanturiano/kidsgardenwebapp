import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-students-form',
  templateUrl: './students-form.component.html',
  styleUrls: ['./students-form.component.scss'],
})
export class StudentsFormComponent implements OnInit {
  
  formGroup: FormGroup;
  constructor(private formBuilder: FormBuilder) { }
    
  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      'nombre': [null, Validators.required],
      'apellido': [null, Validators.required],
      'telefono': [null, Validators.required],
      'generoId': [null, Validators.required],
      'direccion': [null, Validators.required],
      'fechaDeNacimiento': [null, Validators.required],
      'foto': [null, Validators.required],
    });
  }

  public convertFileToBase64( e: File[] ){
    console.log(e);
    var file = e[0];
    var reader = new FileReader();
    reader.onloadend = () => {
      console.log('RESULT', reader.result)
    }
    reader.readAsDataURL(file);
  }

  get invalidName(){
    return this.formGroup.get('nombre').invalid && this.formGroup.get('nombre').touched;
  }
  get invalidLastName(){
    return this.formGroup.get('apellido').invalid && this.formGroup.get('apellido').touched;
  }

}
