import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'clases-home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./pages/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'clases-home',
    loadChildren: () => import('./pages/clases-home/clases-home.module').then( m => m.ClasesHomePageModule)
  },
  {
    path: 'clase-especifica',
    loadChildren: () => import('./pages/clase-especifica/clase-especifica.module').then( m => m.ClaseEspecificaPageModule)
  },
  {
    path: 'calificacion',
    loadChildren: () => import('./pages/calificacion/calificacion.module').then( m => m.CalificacionPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./pages/perfil/perfil.module').then( m => m.PerfilPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
