import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Usuario } from '../models/usuario.model';
import { UsuarioService } from '../services/usuario/usuario.service';

declare function init_plugins();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 // usuario: Usuario;
 usuario: string;
  recuerdame: boolean = false;

  constructor( public router: Router,
               public usuService: UsuarioService ) { }

  ngOnInit() {
    init_plugins();
    this.usuario = localStorage.getItem('usuario') || '';
  }


  ingresar( forma: NgForm) {
    if (forma.invalid) {
      return;
    }
    const usuario = new Usuario( null, null, null, forma.value.usuario, forma.value.password);
    console.log(usuario);

    this.usuService.login( usuario, forma.value.recuerdame)
      .subscribe(correcto => this.router.navigate(['/dashboard']));
//    console.log( forma.value );
  }
}
