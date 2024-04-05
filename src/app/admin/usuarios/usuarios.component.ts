import { Component } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { IUsuario } from 'src/app/interfaces/Usuario.interface';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
})
export class UsuariosComponent {

  usuarios: IUsuario[] = []
  constructor(
    private modalCtrl: ModalController,
    private appService: AppService,
    private alertController: AlertController
  ) {
    this.appService.postData({ accion: "getAllUsers" }).subscribe((res: any) => {
      this.usuarios = res;
    })
  }



  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }
  async ir(estado: number, id: number) {
    const alert = await this.alertController.create({
      header: 'Actualizar Estado',
      message: '¿Desea actualizar el estado del usuario?',
      inputs: [
        {
          label: 'Activo',
          type: "radio",
          value: '1',
          checked: (estado === 1)

        },
        {
          label: 'Inactivo',
          type: "radio",
          value: '0',
          checked: (estado === 0)

        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {

          }
        }, {
          text: 'Cambiar',
          handler: blah => {

            this.appService.postData({ accion: "updateEstado", estado: blah, id }).subscribe((res: any) => {
              this.appService.showToast(res.msg)
              this.appService.postData({ accion: "getAllUsers" }).subscribe((res: any) => {
                this.usuarios = res;
              })
            })
          }
        }
      ]
    })

    await alert.present()
  }

}
