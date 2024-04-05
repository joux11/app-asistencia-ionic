import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { isNotAuthenticatedGuard } from './auth/guards/is-not-authenticated.guard';
import { IsAuthenticatedGuard } from './auth/guards/is-authenticated.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
    canActivate: [IsAuthenticatedGuard]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/login.module').then(m => m.LoginPageModule),
    canActivate: [isNotAuthenticatedGuard]
  },
  {
    path: 'registrar-n',
    loadChildren: () => import('./registrar-n/registrar-n.module').then(m => m.RegistrarNPageModule),
    canActivate: [IsAuthenticatedGuard]
  },
  {
    path: 'registrar-asistencia',
    loadChildren: () => import('./registrar-asistencia/registrar-asistencia.module').then(m => m.RegistrarAsistenciaPageModule),
    canActivate: [IsAuthenticatedGuard]
  },
  {
    path: 'listado-usuarios',
    loadChildren: () => import('./listado-usuarios/listado-usuarios.module').then(m => m.ListadoUsuariosPageModule),
    canActivate: [IsAuthenticatedGuard]
  },
  {
    path: 'listado',
    loadChildren: () => import('./listado/listado.module').then(m => m.ListadoPageModule),
    canActivate: [IsAuthenticatedGuard]
  },

  {
    path: 'acerca-de',
    loadChildren: () => import('./acerca-de/acerca-de.module').then(m => m.AcercaDePageModule),
    canActivate: [IsAuthenticatedGuard]
  },
  {
    path: 'usuario',
    loadChildren: () => import('./usuario/usuario.module').then(m => m.UsuarioPageModule),
    canActivate: [IsAuthenticatedGuard]
  },
  {
    path: 'listado-asistencia',
    loadChildren: () => import('./listado-asistencia/listado-asistencia.module').then(m => m.ListadoAsistenciaPageModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminPageModule),
    canActivate: [IsAuthenticatedGuard]
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
