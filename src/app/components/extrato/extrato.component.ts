import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Transferencia } from 'src/app/models/transferencias';
import { TransfService } from 'src/app/services/transf.service';

@Component({
  selector: 'app-extrato',
  templateUrl: './extrato.component.html',
  styleUrls: ['./extrato.component.css']
})
export class ExtratoComponent implements OnInit  {
  transferencias: Transferencia[] = [];
  dataSource = new MatTableDataSource(this.transferencias);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private transferenciaService: TransfService,
    private snackBar: MatSnackBar) {}
  ngOnInit() {
    this.getTransferencias();
  }

  getTransferencias() {
    this.transferenciaService.getTransferencias().subscribe(
      (data:any) => {
        this.transferencias = data.conteudo;
        this.dataSource.data = this.transferencias
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
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
