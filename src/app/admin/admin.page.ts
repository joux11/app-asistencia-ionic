import { Component, OnInit } from '@angular/core';
import { items } from './items/items';
import { AppService } from '../services/app.service';
import { ModalController } from '@ionic/angular';
import { AulasComponent } from './aulas/aulas.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  items: { nombre: string, descripcion: string, icon?: string, component?: any }[] = []

  constructor(
    private appService: AppService,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.items = items
  }
  respaldar() {
    this.appService.postData({ accion: "backup" }).subscribe((res: any) => {
      if (res.status) {
        this.appService.showToast(res.msg)
      }
    })
  }
  async abrirModal(component: any) {
    const modal = await this.modalCtrl.create({
      component: component,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();


  }

}
