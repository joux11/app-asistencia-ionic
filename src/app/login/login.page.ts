import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  screen: any = 'signin';
  formData: FormGroup;
  formDataL: FormGroup;
  isLoading: boolean = false;
  constructor(private fb: FormBuilder, private auth: AuthService, private _navController: NavController) {
    this.formData = this.fb.group({
      cedula: ['', [Validators.required]],
      name: ['', [Validators.required]],
      secondname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      secondlastname: ['', [Validators.required]],
      celular: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
    this.formDataL = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    })
  }



  change(event: string) {
    this.screen = event;
  }

  login() {

    if (this.formDataL.valid) {

      const body = {
        accion: 'loginUser',
        email: this.formDataL.get('email')!.value,
        password: this.formDataL.get('password')!.value
      }
      console.log(body)

      this.auth.userLogin(body).subscribe((data: any) => {
        if (data.status) {
          this.auth.showToast(data.message);
          this._navController.navigateRoot('home');
          this.formData.reset()

        } else {
          this.auth.showToast(data.message);
        }
      });
    }
  }

  register() {

    if (this.formData.valid) {

      const body = {
        accion: "registrarUser",
        cedula: this.formData.get('cedula')!.value,
        nombre: this.formData.get('name')!.value,
        segundo_nombre: this.formData.get('secondname')!.value,
        apellido: this.formData.get('lastname')!.value,
        segundo_apellido: this.formData.get('secondlastname')!.value,
        numero_celular: this.formData.get('celular')!.value,
        email: this.formData.get('email')!.value,
        password: this.formData.get('password')!.value
      }

      this.auth.userRegister(body).subscribe((data: any) => {
        if (data.status) {
          this.screen = 'signin';
          this.auth.showToast(data.message);
          this.formData.reset()
        } else {
          this.auth.showToast(data.message);
        }
      });
    }
  }

}
