import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { ModalController, NavController, PopoverController } from '@ionic/angular';
import { IChild } from '../interfaces/Child.interface';
import { AppService } from '../services/app.service';
import { ModalChildComponent } from './modal-child/modal-child.component';
import * as moment from 'moment';
import { IAsistenciaN } from '../interfaces/RegistroAsistenciaN.interface';
import { IUsuario } from '../interfaces/Usuario.interface';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.page.html',
  styleUrls: ['./listado.page.scss'],
})
export class ListadoPage {
  usuario?: IUsuario;
  children: IChild[] = [];
  AsistenciaN: IAsistenciaN[] = [];



  fechaActual = moment().format("YYYY-MM-DD");
  constructor(
    private nav: NavController,
    private popController: PopoverController,
    private appService: AppService,
    private modalCtrl: ModalController
  ) {

  }

  ionViewWillEnter() {
    this.appService.getSession("user").then(user => {
      this.usuario = JSON.parse(user!)

      this.appService.postData({ accion: "getAllChildrenByAula", aula_id: this.usuario?.aula_id }).subscribe((res: any) => {
        this.children = res
        this.listarAsistenciaByDate()
      })
    })



  }
  ir() {
    this.popController.dismiss();
    this.nav.navigateForward("/registrar-n")
  }

  childPage(id: number) {
    this.appService.createSession("child", id.toString());
    this.abrirModal()
  }

  async abrirModal() {
    const modal = await this.modalCtrl.create({
      component: ModalChildComponent,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'cancel') {
      this.listarAsistenciaByDate()

    }
  }

  listarAsistenciaByDate() {

    const body = { accion: "getAsistenciaNByDate", fecha_marcacion: this.fechaActual }
    this.appService.postData(body).subscribe((res: any) => {
      this.AsistenciaN = res

    })
  }


  hayHoraEntrada(id: number): boolean {
    const item = this.AsistenciaN.find(x => x.niño_id === id)

    if (item?.fecha_marcacion !== this.fechaActual) {
      return false;
    }
    if (item.hora_entrada && !item.hora_salida) {
      return true;
    }
    return false;
  }

  hayHoraSalida(id: number) {
    const item = this.AsistenciaN.find(x => x.niño_id === id)
    if (item?.fecha_marcacion !== this.fechaActual) {
      return false;
    }
    if (item.hora_salida) {
      return true;
    }

    return false;

  }

}
