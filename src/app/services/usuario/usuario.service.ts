import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Usuario } from '../../models/usuario.model';
import { URL_SERVICIOS } from '../../config/config';
import { Router } from '@angular/router';

import swal from 'sweetalert';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';

import { throwError } from 'rxjs';

// import 'rxjs/add/operator/catch';
// import 'rxjs/add/observable/throw';

/*import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
// import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { map } from 'rxjs/operators';*/



@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  usuario: string;
  password: string;
  token: string;
  url: string;

  constructor(public http: HttpClient,
              public router: Router
) {
  this.cargarStorage();
 }

  guardarStorage(id: string, token: string, usuario: string) {
    //  guardarStorage(id: string, token: string, usuario: Usuario, menu: any) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    // localStorage.setItem('menu', JSON.stringify(menu));

    this.usuario = usuario;
    this.token = token;
    //  this.menu = menu;
  }
  estaLogueado() {
   //   return true;
    return (this.token.length > 5) ? true : false;
  }
  cargarStorage() {

    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      //   this.menu = JSON.parse(localStorage.getItem('menu'));
    } else {
      this.token = '';
      this.usuario = null;
      //   this.menu = [];
    }

  }


  logout() {
    this.usuario = null;
    this.token = '';
  //  this.menu = [];

    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
 //   localStorage.removeItem('menu');

    this.router.navigate(['/login']);
  }


  login( usuario: Usuario, recordar: boolean = false ) {

    console.log(usuario);
    if (recordar) {
    localStorage.setItem('usuario', usuario.usu_usuario);
   } else {
    localStorage.removeItem('usuario');
    }

    let url = URL_SERVICIOS + '/login';
    return this.http.post(url, usuario).pipe(
      map((resp: any) => {
        this.guardarStorage(resp.id, resp.token, resp.usuario);
        //        this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);

        console.log(resp);
        //     this.guardarStorage(resp.id, resp.token, resp.usuario);
        return true;
      }),
      catchError(err => {

        swal('Error en el login', err.error.mensaje, 'error');
        //  tslint:disable-next-line: deprecation
        return Observable.throw(err);
      })
       );

  }




  crearUsuario(usuario: Usuario) {

    const url = URL_SERVICIOS + '/usuario';

    return this.http.post(url, usuario).pipe(
      map((resp: any) => {

        swal('Usuario creado', usuario.usu_correo, 'success');
        return resp.usuario;
      }),
         catchError(err => {
        swal(err.error.mensaje, err.error.errors.message, 'error');
        //  tslint:disable-next-line: deprecation
        return Observable.throw(err);
      })
         );
  }

}
