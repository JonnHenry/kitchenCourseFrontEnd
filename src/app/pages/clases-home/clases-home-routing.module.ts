import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClasesHomePage } from './clases-home.page';

const routes: Routes = [
  {
    path: '',
    component: ClasesHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClasesHomePageRoutingModule {}
