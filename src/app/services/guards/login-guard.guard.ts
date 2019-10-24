import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';


@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {

  constructor(public usuService: UsuarioService,
              public router: Router) { }


  canActivate() {
    if (this.usuService.estaLogueado()) {
      return true;
    } else {
      console.log('Bloquedo por el guard');
      this.router.navigate(['/login']);
      return false;
    }
  }
}
