import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormularioSesionComponent } from './formulario-sesion/formulario-sesion.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FormularioSesionComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'FrontFormularioReactivo';
}
