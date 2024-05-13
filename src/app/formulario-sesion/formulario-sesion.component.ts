import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioFormService } from '../usuario-form.service';
import { UsuarioForm } from '../usuarioForm';
import { CommonModule } from '@angular/common';
import { of, switchMap } from 'rxjs';

@Component({
  selector: 'app-formulario-sesion',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,CommonModule],
  templateUrl: './formulario-sesion.component.html',
  styleUrl: './formulario-sesion.component.css'
})
export class FormularioSesionComponent {
  loginForm: FormGroup;
  usuarios: UsuarioForm[] = [];
  selectedUsuario: UsuarioForm | null = null;

  constructor(private fb: FormBuilder, private usuarioService: UsuarioFormService) {
    this.loginForm = this.fb.group({
      idUsuario: [],
      nombreUsuario: ['', Validators.required],
      emailUsuario: ['', [Validators.required, Validators.email]],
      apodoUsuario: ['', Validators.required],
    });

    this.loadUsuarios();
  }

  loadUsuarios() {
    this.usuarioService.obtenerUsuarioForm().subscribe((usuarios) => {
      this.usuarios = usuarios;
    });
  }

  crearPerfil() {
    if (this.loginForm.valid) {
      const newUsuario = this.loginForm.value;

      // Send the new user data to the server using HTTP
      this.usuarioService.addUsuarioForm(newUsuario).subscribe((response) => {
        // Handle successful profile creation (e.g., clear the form, show a success message)
        console.log('Perfil creado:', response);
        this.loginForm.reset();
        this.loadUsuarios();
      }, (error) => {
        // Handle profile creation errors
        console.error('Error al crear perfil:', error);
      });
    }
  }

 eliminar(usuario: UsuarioForm): void {
  const confirmation = confirm(`¿Está seguro de eliminar el usuario ${usuario.nombreUsuario}?`);
  if (confirmation) {
    this.usuarioService.deleteUsuarioForm(usuario.idUsuario)
      .pipe(
        switchMap(() => this.usuarioService.obtenerUsuarioForm()) 
      )
      .subscribe(usuarios => {
        this.usuarios = usuarios;
        alert('Usuario eliminado exitosamente'); 
      }, error => {
        console.log('Error al eliminar usuario:', error);
        alert('Error al eliminar usuario. Intente nuevamente.'); 
      });
  } else {
    alert('Eliminación cancelada');
  }
}
  

  editar(usuario: UsuarioForm) {
    this.selectedUsuario = usuario;
    this.loginForm.patchValue(usuario);
  }
}