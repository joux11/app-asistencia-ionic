import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-aulas',
  templateUrl: './aulas.component.html',
  styleUrls: ['./aulas.component.scss'],
})
export class AulasComponent {

  nombre?: string;
  descripcion?: string;

  aulas?: any[];
  constructor(
    private modalCtrl: ModalController,
    private AppService: AppService
  ) {
    this.AppService.postData({ accion: "getAllAulas" }).subscribe((res: any) => {
      this.aulas = res
    })
  }


  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  guardar() {
    const body = {
      accion: "createAula",
      nombre: this.nombre,
      descripcion: this.descripcion
    }
    this.AppService.postData(body).subscribe((res: any) => {
      if (res.status) {
        this.AppService.showToast(res.msg)
        this.nombre = ""
        this.descripcion = ""
        this.AppService.postData({ accion: "getAllAulas" }).subscribe((res: any) => {
          this.aulas = res
        })
      }
    })
  }

}
