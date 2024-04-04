import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListadoUsuariosPageRoutingModule } from './listado-usuarios-routing.module';

import { ListadoUsuariosPage } from './listado-usuarios.page';
import { MenuComponent } from "../shared/menu/menu.component";

@NgModule({
  declarations: [ListadoUsuariosPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListadoUsuariosPageRoutingModule,
    MenuComponent
  ]
})
export class ListadoUsuariosPageModule { }
