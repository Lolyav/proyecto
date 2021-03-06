import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import swal from 'sweetalert';
import { Usuario } from '../models/usuario.model';
import { UsuarioService } from '../services/service.index';
import { Router } from '@angular/router';

declare function init_plugins();


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  forma: FormGroup;

  constructor( public usuService: UsuarioService,
              public router: Router ) { }

  sonIguales(campo1: string, campo2: string) {

    return (group: FormGroup) => {

      const pass1 = group.controls[campo1].value;
      const pass2 = group.controls[campo2].value;

      if (pass1 === pass2) {
        return null;
      }

      return { sonIguales: true };
    };
  }

  ngOnInit() {

    init_plugins();


    this.forma = new FormGroup({
        nombre: new FormControl(null, Validators.required),
        apellido: new FormControl(null, Validators.required),
        correo: new FormControl(null, [Validators.required, Validators.email]),
        usuario: new FormControl(null, Validators.required),
 //       estado: new FormControl(null, Validators.required),
        password: new FormControl(null, Validators.required),
        password2: new FormControl(null, Validators.required),
        condiciones: new FormControl(false)
      }, { validators: this.sonIguales('password', 'password2') });

  }


  registrarUsuario() {
     console.log('Forma valida: ', this.forma.valid);
     console.log(this.forma.value);
     if (!this.forma.valid) {
      return;
    }
     if (!this.forma.value.condiciones) {
      swal('Importante', 'Debe aceptar las condiciones', 'warning');
      return;
    }

     const usuario = new Usuario(
      this.forma.value.nombre,
      this.forma.value.apellido,
      this.forma.value.correo,
      this.forma.value.usuario,
      this.forma.value.password
  //     this.forma.value.estado
    );
     console.log(usuario);
     // tslint:disable-next-line: semicolon
     this.usuService.crearUsuario(usuario)
       .subscribe(resp => this.router.navigate(['/login']));
  }
}
