import { Component } from '@angular/core';
import { NavController, PopoverController } from '@ionic/angular';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-listado-usuarios',
  templateUrl: './listado-usuarios.page.html',
  styleUrls: ['./listado-usuarios.page.scss'],
})
export class ListadoUsuariosPage {

  constructor(
    private appService: AppService
  ) {

  }



}
