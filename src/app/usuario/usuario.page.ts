import { Component, OnInit } from '@angular/core';
import { AppService } from '../services/app.service';
import { IUsuario } from '../interfaces/Usuario.interface';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.page.html',
  styleUrls: ['./usuario.page.scss'],
})
export class UsuarioPage implements OnInit {

  constructor(
    private appService: AppService,
    private nav: NavController
  ) { }

  usuario?: IUsuario

  ngOnInit() {
    this.appService.getSession("user").then(user => {
      this.usuario = JSON.parse(user!)
    })
  }

  ir() {
    this.nav.navigateForward('/registrar-asistencia')
  }

}
