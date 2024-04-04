import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AppService } from 'src/app/services/app.service';


export const IsAuthenticatedGuard: CanActivateFn = (route, state) => {

  const appService = inject(AppService);
  const router = inject(NavController);

  let status: boolean = true;

  appService.getSession("user").then(user => {
    if (!user) {
      router.navigateRoot("/login")
      status = false;
    }
  })
  return status;
}
