import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {first} from 'rxjs/operators';
import {AlertService} from 'src/app/shared/services/alert.service';
import {AuthService} from '../services/auth-service.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  hide = true;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService
  ) {
    if (this.authService.currentUser) {
      this.redirectTo(this.authService.currentUser.role);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  redirectTo(role) {
    switch (role) {
      case 'Direccion':
        this.router.navigate(['/school']);
        break;

      case 'Estudiante':
        this.router.navigate(['/students']);
        break;

      case 'Docente':
        this.router.navigate(['/teachers']);
        break;

      case 'Asistente':
        this.router.navigate(['/teachers']);
        break;

      default:
        this.router.navigate(['/login']);
        break;
    }
  }

  get f() {
    return this.loginForm.controls;
  }

  async onSubmit() {

    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    await this.alertService.presentLoading();
    this.authService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        (data: any) => {
          this.alertService.dismissLoading();
          this.redirectTo(data.UserInfo.Rol);
        },
        error => {
          this.alertService.dismissLoading();
          this.alertService.error('Usuario o contraseña incorrectos');
        }
      );
  }

}
