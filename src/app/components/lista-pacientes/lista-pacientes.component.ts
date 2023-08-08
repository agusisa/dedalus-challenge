import { Component, OnDestroy, OnInit } from '@angular/core';
import { Paciente } from 'src/app/models/Paciente';
import { Router } from '@angular/router';
import { PacienteService } from 'src/app/services/paciente.service';
import { Observable, Subject, catchError, map, of, startWith, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-lista-pacientes',
  templateUrl: './lista-pacientes.component.html',
  styleUrls: ['./lista-pacientes.component.css'],
})
export class ListaPacientesComponent implements OnInit, OnDestroy {

  pacientes$: Observable<Paciente[]> = of([]);
  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private pacienteService: PacienteService,
    private router: Router
  ) {}

  ngOnInit() {
    this.pacientes$ = this.pacienteService.obtenerPacientes().pipe(
      takeUntil(this.destroy$),
      map((data) => data.entry.map((entry: any) => entry.resource)),
      catchError((error) => {
        console.error('Error obteniendo la lista de pacientes:', error);
        return of([]);
      }),
      startWith([])
    );
  }

  mostrarDetalle(pacienteId: string) {
    this.router.navigate(['/paciente', pacienteId]);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
