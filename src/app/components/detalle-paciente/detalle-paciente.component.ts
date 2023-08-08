import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, catchError, map, of, startWith, takeUntil, tap } from 'rxjs';
import { Paciente } from 'src/app/models/Paciente';
import { ResourceOutput } from 'src/app/models/ResourceOutput';
import { PacienteService } from 'src/app/services/paciente.service';

@Component({
  selector: 'app-detalle-paciente',
  templateUrl: './detalle-paciente.component.html',
  styleUrls: ['./detalle-paciente.component.css'],
})
export class DetallePacienteComponent implements OnInit, OnDestroy {
  name$: Subject<any> = new Subject()
  detallePaciente$: Observable<any[]> = of([]); // Observable para almacenar los detalles del paciente
  private destroy$: Subject<void> = new Subject<void>();
  constructor(
    private route: ActivatedRoute,
    private pacienteService: PacienteService
  ) {}

  ngOnInit() {

    this.route.params.subscribe((params) => {
      const pacienteId = params['id'];

      // Obtener los detalles del paciente
      this.detallePaciente$ = this.pacienteService
        .obtenerDetallePaciente(pacienteId)
        .pipe(
          takeUntil(this.destroy$),
          tap((data) => {
            const name = `${data.entry[0].resource.name[0].given[0]} ${data.entry[0].resource.name[0].family}`
            this.name$.next(name)
          }),
          map((data) => this.extractResources(data.entry)),
          catchError((error) => {
            console.error('Error obteniendo el detalle del paciente:', error);
            return of([]);
          }),
          startWith([])
        );
    });
  }

  extractResources(data: any): ResourceOutput[] {
    const dataMapTable: ResourceOutput[] = [];

    if (data && Array.isArray(data)) {
      data.forEach((entry: any) => {
        const resource = entry.resource;
        if (resource) {
          let basicInfo = {
            resourceType: resource.resourceType,
            id: resource.id,
            effectiveDateTime:
              resource.effectiveDateTime || resource.effectiveInstant,
            valueQuantity: resource.valueQuantity
          };

          if (resource.resourceType === 'Encounter' && resource.location) {
            resource.location.forEach((loc: any) => {
              dataMapTable.push({
                ...basicInfo,
                location: loc.location,
              });
            });
          } else {
            dataMapTable.push(basicInfo);
          }
        }
      });
    }
    dataMapTable.shift()
    return dataMapTable;
  }

    ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  
}
