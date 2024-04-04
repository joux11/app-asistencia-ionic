import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../services/app.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-registrar-n',
  templateUrl: './registrar-n.page.html',
  styleUrls: ['./registrar-n.page.scss'],
})
export class RegistrarNPage {

  formData: FormGroup
  constructor(
    private fb: FormBuilder,
    private appService: AppService,
    private nav: NavController
  ) {
    this.formData = this.fb.group({
      identificacion: ['', [Validators.required]],
      primer_nombre: ['', [Validators.required]],
      segundo_nombre: ['',],
      primer_apellido: ['', [Validators.required]],
      segundo_apellido: ['',],
      fecha_nacimiento: ['', [Validators.required]],
      genero: ['', [Validators.required]]
    })
  }

  registrar() {
    if (!this.formData.valid) return this.formData.markAllAsTouched()
    const body = {
      accion: "registerNiño",
      identificacion: this.formData.get('identificacion')!.value,
      primer_nombre: this.formData.get('primer_nombre')!.value,
      segundo_nombre: this.formData.get('segundo_nombre')!.value,
      primer_apellido: this.formData.get('primer_apellido')!.value,
      segundo_apellido: this.formData.get('segundo_apellido')!.value,
      fecha_nacimiento: this.formData.get('fecha_nacimiento')!.value,
      genero: this.formData.get('genero')!.value
    }

    this.appService.postData(body).subscribe((res: any) => {
      if (res.status) {
        this.appService.showToast(res.msg)
        this.formData.reset()
        this.nav.navigateRoot("/listado")
      } else {
        this.appService.showToast(res.msg)

      }
    })
  }



}
