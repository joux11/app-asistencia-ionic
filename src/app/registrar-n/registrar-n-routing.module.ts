import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistrarNPage } from './registrar-n.page';

const routes: Routes = [
  {
    path: '',
    component: RegistrarNPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrarNPageRoutingModule {}
