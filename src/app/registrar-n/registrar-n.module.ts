import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrarNPageRoutingModule } from './registrar-n-routing.module';

import { RegistrarNPage } from './registrar-n.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistrarNPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [RegistrarNPage]
})
export class RegistrarNPageModule { }
