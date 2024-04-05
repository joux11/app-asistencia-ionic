import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminPageRoutingModule } from './admin-routing.module';

import { AdminPage } from './admin.page';
import { MenuComponent } from '../shared/menu/menu.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { AulasComponent } from './aulas/aulas.component';
import { AsignacionAulasComponent } from './asignacion-aulas/asignacion-aulas.component';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminPageRoutingModule,
    MenuComponent,
    MatTableModule
  ],
  declarations: [AdminPage, UsuariosComponent, AulasComponent, AsignacionAulasComponent]
})
export class AdminPageModule { }
