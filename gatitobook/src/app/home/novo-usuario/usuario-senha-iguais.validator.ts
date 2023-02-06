import { FormGroup } from '@angular/forms';

export function usuarioSenhaIguaisValidator(formGroup: FormGroup) {
  const userName = formGroup.get('userName')?.value ?? '';  // esse ?? '' é uma técnica do typescript para dizer que se o valor não existir minha consante terá uma string vazia.
  const password = formGroup.get('password')?.value ?? '';

  if (userName.trim() + password.trim()) {
    return userName !== password ? null : { senhaIgualUsuario: true }
  } else {
    return null; // se usuario concatenado com a senha for vazio retorna null.
  }
}
