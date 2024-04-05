import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Input, input } from '@angular/core';

import { IonicModule, MenuController, NavController } from '@ionic/angular';
import { IUsuario } from 'src/app/interfaces/Usuario.interface';
import { AppService } from 'src/app/services/app.service';



@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,

  ]

})
export class MenuComponent implements AfterViewInit {

  usuario?: IUsuario;
  isAdmin: boolean = false;
  menuItems = [
    {
      ruta: "/home",
      imagen_url: "../../../../assets/img/circle.png",
      titulo: "Principal"
    },
    {
      ruta: "/usuario",
      imagen_url: "../../../../assets/img/attendance.png",
      titulo: "Registrar Asistencia"
    },
    {
      ruta: "/listado",
      imagen_url: "../../../../assets/img/kidds.png",
      titulo: "Registrar Asistencia Niños"
    },
    {
      ruta: "/listado-asistencia",
      imagen_url: "../../../../assets/img/asistencia_re.png",
      titulo: "Asistencias Registradas"
    },
    {
      ruta: "/acerca-de",
      imagen_url: "../../../../assets/img/info.png",
      titulo: "Acerca de"
    }

  ];




  constructor(
    private nav: NavController,
    private menuController: MenuController,
    private appService: AppService
  ) {
    this.appService.getSession("user").then(usuario => {
      this.usuario = JSON.parse(usuario!)
      if (this.usuario?.rol_id == 1) {
        this.isAdmin = true
      }
    })
    console.log("xd");
  }
  ngAfterViewInit(): void {
    console.log("xdEntera");
  }
  ionViewWillEnter() {
    console.log("xdEnter");
  }

  ir(ruta: string) {
    this.menuController.close();
    this.nav.navigateRoot(ruta);

  }




  logout() {
    this.appService.clearSession();
    this.nav.navigateForward("")
    this.menuController.close();
  }

}


