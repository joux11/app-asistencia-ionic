import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrarAsistenciaPageRoutingModule } from './registrar-asistencia-routing.module';

import { RegistrarAsistenciaPage } from './registrar-asistencia.page';
import { MiniMapComponent } from './components/mini-map/mini-map.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistrarAsistenciaPageRoutingModule
  ],
  declarations: [RegistrarAsistenciaPage, MiniMapComponent]
})
export class RegistrarAsistenciaPageModule { }
