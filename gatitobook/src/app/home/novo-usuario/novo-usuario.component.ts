import { UsuarioExisteService } from './usuario-existe.service';
import { NovoUsuarioService } from './novo-usuario.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NovoUsuario } from './novo-usuario';
import { minusculoValidator } from './minusculo.valitador';
import { usuarioSenhaIguaisValidator } from './usuario-senha-iguais.validator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-novo-usuario',
  templateUrl: './novo-usuario.component.html',
  styleUrls: ['./novo-usuario.component.css']
})
export class NovoUsuarioComponent implements OnInit {

  novoUsuarioForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private novoUsuarioService: NovoUsuarioService,
    private usuarioExisteService: UsuarioExisteService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.novoUsuarioForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      fullName: ['', [Validators.required, Validators.minLength(4)]],
      userName: ['', [minusculoValidator], [this.usuarioExisteService.usuarioJaExiste()]],
      password: ['']
    }, {
      validators: [usuarioSenhaIguaisValidator] // objeto de validação do formulário e não do campo. Por isso está fora do primeiro par de chaves.
      // Atenção que este 'validators' é com v minusculo, diferente dos anteriores.
    }
    );
  }

  cadastrar() {
    if (this.novoUsuarioForm.valid) {  // Se o formulário for válido...
      const novoUsuario = this.novoUsuarioForm.getRawValue() as NovoUsuario;  // eu guardo os valores do novo usuário e armazeno na variável novoUsuário...
      this.novoUsuarioService.cadastraNovoUsuario(novoUsuario).subscribe(() => {  // chamo a função que está no service e passo pra ela os dados do novoUsuario para que ele seja cadastrado...
        this.router.navigate(['']); // após ser cadastrado ele é direcionado para a tela de login, no component HOME, que é padrão, por isso tem uma string em branco.
      },
        (error) => {  // se houver algum erro...
          console.log(error); // o erro será impresso no console.log
        }
      )
    }
  }

}
