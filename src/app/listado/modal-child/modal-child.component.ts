import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import * as moment from 'moment';
import { IChild } from 'src/app/interfaces/Child.interface';
import { IAsistenciaN } from 'src/app/interfaces/RegistroAsistenciaN.interface';
import { IUsuario } from 'src/app/interfaces/Usuario.interface';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-modal-child',
  templateUrl: './modal-child.component.html',
  styleUrls: ['./modal-child.component.scss'],
})
export class ModalChildComponent {

  id?: number;
  name?: string;
  child?: IChild;
  fecha_actual: string;
  hora_actual: string;

  horaRegistroEntrada?: string;
  horaRegistroSalida?: string;

  usuario?: IUsuario;

  observaciones_entrada?: boolean;

  txt_observacion_entrada?: string;
  txt_observacion_salida?: string;

  response?: IAsistenciaN;

  mostrarDatosSalida?: boolean;
  mostrarDatosEntrada?: boolean;
  mostrarRegistroSalida: boolean = false;

  constructor(private modalCtrl: ModalController,
    private appService: AppService,
    private alertController: AlertController
  ) {

    this.appService.getSession("user").then(user => {
      this.usuario = JSON.parse(user!);
    })


    this.appService.getSession("child").then(child => {
      this.id = parseInt(child!);
      this.appService.postData({ accion: "getChild", id: child }).subscribe((res: any) => {
        this.child = res;
      })
      const body = { accion: "getAsistenciaNByDateAndId", fecha_marcacion: this.fecha_actual, id: child }
      this.appService.postData(body).subscribe((res: any) => {
        this.response = res;
        if (!this.response) {
          this.mostrarDatosEntrada = true
          this.mostrarDatosSalida = false
          const hora = new Date().getHours();

          if (hora >= 8) {
            this.alertHoraTarde();
            this.observaciones_entrada = true;
          } else {
            this.observaciones_entrada = false;
          }
        } else {

          this.mostrarDatosEntrada = false
          this.mostrarDatosSalida = true
          this.horaRegistroEntrada = this.response.hora_entrada

          if (this.response.hora_salida) {
            this.mostrarDatosSalida = false;
            this.horaRegistroSalida = this.response.hora_salida
            this.mostrarRegistroSalida = true



          }

        }
      })
    })

    this.fecha_actual = moment().format('YYYY-MM-DD');

    this.hora_actual = moment().format('HH:mm:ss');


  }

  cancel() {
    this.appService.closeSession("child")
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss(this.name, 'confirm');
  }

  async alertHoraTarde() {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: 'Se paso de la hora de Entrada, este registro ira bajo su propia responsabilidad.',
      buttons: ['OK']
    })

    await alert.present();
  }

  registrarEntrada() {
    const body = {
      accion: "createAsistenciaN",
      fecha_marcacion: this.fecha_actual,
      hora_entrada: this.hora_actual,
      estado: "A",
      observacion_entrada: this.txt_observacion_entrada ?? "",
      usuario_id: this.usuario?.id,
      niño_id: this.id!,

    }
    
    this.appService.postData(body).subscribe((res: any) => {
      if (res.status) {
        this.appService.showToast(res.msg)
        this.cancel();
      } else {
        this.appService.showToast(res.msg)
      }
    })
  }

  registrarSalida() {
    const body = {
      accion: "updateAsistenciaN",
      hora_salida: this.hora_actual,
      observacion_salida: this.txt_observacion_salida ?? "",
      id: this.response?.id
    }


    this.appService.postData(body).subscribe((res: any) => {
      if (res.status) {
        this.appService.showToast(res.msg)
        this.cancel();
      }
    })
  }


}
