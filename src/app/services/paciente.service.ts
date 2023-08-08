import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { Paciente } from './app/models/paciente.model';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  private baseUrl = 'https://hapi.fhir.org/baseR4/Patient';

  constructor(private http: HttpClient) { }

  obtenerPacientes(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  obtenerDetallePaciente(id: string): Observable<any> {
    const url = `${this.baseUrl}/${id}/$everything`;
    return this.http.get(url);
  }
}