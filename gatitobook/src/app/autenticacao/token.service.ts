import { Injectable } from '@angular/core';

// vou manipular a API de localstorage do chrome. Para isso, crio essa constante fora do escopo da minha classe.
const KEY = 'token';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  retornaToken() {
    return localStorage.getItem(KEY) ?? '';
  }

  salvaToken(token: string) {
    localStorage.setItem(KEY, token);
  }

  excluiToken() {
    localStorage.removeItem(KEY);
  }

  possuiToken() {
    return !!this.retornaToken();   // !! é para informar que eu quero um booleano de retorno, pois a função reornaToken não é booleanda.
  }

}
