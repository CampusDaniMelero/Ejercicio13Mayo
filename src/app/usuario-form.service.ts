import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioForm } from './usuarioForm';
import { Observable, Subject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioFormService {
  private url:string = 'http://localhost:8083/usuario';

  usuarioCambio = new Subject<UsuarioForm[]>();

  constructor(private http:HttpClient) { }

  obtenerUsuarioForm():Observable<UsuarioForm[]>{
    return this.http.get<UsuarioForm[]>(this.url).pipe(map((data:UsuarioForm[]) => data.sort((a,b) => a.idUsuario - b.idUsuario)));
  }

  obtenerUsuarioFormPorId(idUsuario:number):Observable<UsuarioForm>{
    return this.http.get<UsuarioForm>(`${this.url}/${idUsuario}`);
  }

  addUsuarioForm(usuarioForm:UsuarioForm): Observable<UsuarioForm>{
    return this.http.post<UsuarioForm>(this.url, usuarioForm);
  }

  deleteUsuarioForm(idUsuario:number):Observable<Object>{
    return this.http.delete(`${this.url}/${idUsuario}`);
  }

  editUsuarioForm(usuarioForm:UsuarioForm):Observable<Object>{
    return this.http.put(`${this.url}/${usuarioForm.idUsuario}`, usuarioForm);
  }
}
