import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AgendamentoComponent } from '../agendamento/agendamento.component';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent {

  constructor(private dialog: MatDialog) {}


  abrirDialogAgendamento() {
    const dialogRef = this.dialog.open(AgendamentoComponent, {
      width: '400px',
      height: '500px' 
    });

    dialogRef.afterClosed().subscribe(result => {
      location.reload
    });
  }

}
