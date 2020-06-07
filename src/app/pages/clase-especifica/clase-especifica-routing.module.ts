import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClaseEspecificaPage } from './clase-especifica.page';

const routes: Routes = [
  {
    path: '',
    component: ClaseEspecificaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClaseEspecificaPageRoutingModule {}
