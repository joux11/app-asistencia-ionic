import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListadoPageRoutingModule } from './listado-routing.module';

import { ListadoPage } from './listado.page';
import { MenuComponent } from '../shared/menu/menu.component';
import { KidImagePipe } from '../pipes/kid-image.pipe';
import { CapitalizePipe } from '../pipes/capitalize.pipe';
import { ModalChildComponent } from './modal-child/modal-child.component';
import { AgePipe } from '../pipes/age.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListadoPageRoutingModule,
    MenuComponent,
    DatePipe
  ],
  declarations: [ListadoPage, KidImagePipe, CapitalizePipe, AgePipe, ModalChildComponent]
})
export class ListadoPageModule { }
