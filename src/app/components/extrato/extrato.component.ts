import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Transferencia } from 'src/app/models/transferencias';
import { TransfService } from 'src/app/services/transf.service';

@Component({
  selector: 'app-extrato',
  templateUrl: './extrato.component.html',
  styleUrls: ['./extrato.component.css']
})
export class ExtratoComponent implements OnInit  {
  transferencias: Transferencia[] = [];

  constructor(private transferenciaService: TransfService,
    private snackBar: MatSnackBar) {}
  ngOnInit() {
    this.getTransferencias();
  }

  getTransferencias() {
    this.transferenciaService.getTransferencias().subscribe(
      (data:any) => {
        this.transferencias = data.conteudo;
      },
      (error: any) => {
        console.error('Erro ao obter transferências:', error);
      }
    );
  }


  displayedColumns: string[] = [
    'contaOrigem',
    'contaDestino',
    'valor',
    'taxa',
    'dataTransferencia',
    'dataAgendamento',
    'status'
  ];
}
