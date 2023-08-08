import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaPacientesComponent } from './components/lista-pacientes/lista-pacientes.component';
import { DetallePacienteComponent } from './components/detalle-paciente/detalle-paciente.component';

const routes: Routes = [
  { path: '', redirectTo: 'pacientes', pathMatch: 'full' },
  { path: 'pacientes', component: ListaPacientesComponent },
  { path: 'paciente/:id', component: DetallePacienteComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
