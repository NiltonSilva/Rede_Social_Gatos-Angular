import { Usuario } from './usuario';
import { TokenService } from './../token.service';
import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  // private usuarioSubject = new BehaviorSubject<Usuario>({}) // o BehaviorSubject observa e envia o ultimo dado que estava nele. Ele guarda estado. Ele tem que ser tipado e tem que ter um estado inicial, no nosso caso, um objeto vazio

  // constructor(private tokenService: TokenService) {
  //   if (this.tokenService.possuiToken()) {
  //     this.decodificaJWT();
  //   }
  // }

  // private decodificaJWT() {
  //   const token = this.tokenService.retornaToken();   // retorna o token e armazena na constante token
  //   const usuario = jwt_decode(token) as Usuario;
  //   this.usuarioSubject.next(usuario);
  // }

  // retornaUsuario() {
  //   return this.usuarioSubject.asObservable();
  // }

  // salvaToken(token: string) {
  //   this.tokenService.salvaToken(token);
  //   this.decodificaJWT();
  // }

  // logout() {
  //   this.tokenService.excluiToken();
  //   this.usuarioSubject.next({});
  // }

  // estaLogado() {
  //   return this.tokenService.possuiToken();
  // }

  private usuarioSubject = new BehaviorSubject<Usuario>({});

  constructor(private tokenService: TokenService) {
    if (this.tokenService.possuiToken()) {
      this.decodificaJWT();
    }
  }

  private decodificaJWT() {
    const token = this.tokenService.retornaToken();
    const usuario = jwt_decode(token) as Usuario;
    this.usuarioSubject.next(usuario);
  }

  retornaUsuario() {
    return this.usuarioSubject.asObservable();
  }

  salvaToken(token: string) {
    this.tokenService.salvaToken(token);
    this.decodificaJWT();
  }

  logout() {
    this.tokenService.excluiToken();
    this.usuarioSubject.next({});
  }

  estaLogado() {
    return this.tokenService.possuiToken();
  }
}
