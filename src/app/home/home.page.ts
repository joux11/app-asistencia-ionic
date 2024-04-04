import { Component } from '@angular/core';
import { AppService } from '../services/app.service';
import { IUsuario } from '../interfaces/Usuario.interface';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  irRegistroAsistencia() {
    this.nav.navigateRoot('/usuario')
  }
  irRegistroAsistenciaN() {
    this.nav.navigateRoot('/listado')
  }
  irAsistenciaRegistradas() {
    this.nav.navigateForward('/listado-asistencia')

  }
  irAcercaDe() {
    this.nav.navigateRoot('/acerca-de')
  }

  public usuario!: IUsuario

  constructor(
    private appService: AppService,
    private nav: NavController
  ) {


  }
  logout() {
    this.appService.clearSession();
    this.nav.navigateForward("")
  }

}
