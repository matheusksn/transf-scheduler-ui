  import { Component } from '@angular/core';
  import { FormBuilder, FormGroup, Validators } from '@angular/forms';
  import { MatDialog } from '@angular/material/dialog';
  import { MatSnackBar } from '@angular/material/snack-bar';
  import { ConfirmacaoModalComponent } from 'src/app/components/confirmacao-modal/confirmacao-modal.component';
  import { TransferenciaRequestDTO } from 'src/app/models/transferenciaRequest';
  import { TransfService } from 'src/app/services/transf.service';

  @Component({
    selector: 'app-agendamento',
    templateUrl: './agendamento.component.html',
    styleUrls: ['./agendamento.component.css']
  })
  export class AgendamentoComponent {
    transferenciaForm: FormGroup;

    constructor(
      private transferenciaService: TransfService,
      private snackBar: MatSnackBar,
      private dialog: MatDialog,
      private fb: FormBuilder
    ) {
      this.transferenciaForm = this.fb.group({
        contaOrigem: ['', Validators.required],
        contaDestino: ['', Validators.required],
        valor: ['', [Validators.required, Validators.min(0)]],
        dataTransferencia: ['', Validators.required],
      });
    }

    abrirModalConfirmacao() {
      if (this.transferenciaForm.valid) {
        const transferenciaRequest: TransferenciaRequestDTO = this.transferenciaForm.value;
        const taxa = this.calcularTaxa(transferenciaRequest.dataTransferencia);
        const valorComTaxa = transferenciaRequest.valor + (transferenciaRequest.valor * taxa);
      
        const dialogRef = this.dialog.open(ConfirmacaoModalComponent, {
          data: {
            transferenciaRequest,
            taxa,
            valorComTaxa,
          },
          panelClass: 'custom-dialog-container', 
        });

        dialogRef.afterClosed().subscribe((confirmado: boolean) => {
          if (confirmado) {
            this.agendarTransferencia();
          }
        });
      }
    }

    agendarTransferencia() {
      if (this.transferenciaForm.valid) {
        const transferenciaRequest: TransferenciaRequestDTO = this.transferenciaForm.value;
        this.transferenciaService.agendarTransferencia(transferenciaRequest).subscribe(
          (response: any) => {
            const successMessage = response.mensagem;
            this.snackBar.open(successMessage, 'Fechar', {
              duration: 3000,
              panelClass: 'success-snackbar',
            });
          },
          (error: any) => {
            const errorMessage = error.mensagem || 'Erro na solicitação';
            this.snackBar.open(errorMessage, 'Fechar', {
              duration: 3000,
              panelClass: 'error-snackbar',
            });
          }
        );
      }
    }

    calcularTaxa(dataTransferencia: string): number {
      const diasParaTransferencia = this.calcularDiasParaTransferencia(dataTransferencia);
      let taxa = 0.0;

      if (diasParaTransferencia === 0) {
        taxa = 0.025;
      } else if (diasParaTransferencia >= 1 && diasParaTransferencia <= 10) {
        taxa = 0.0;
      } else if (diasParaTransferencia >= 11 && diasParaTransferencia <= 20) {
        taxa = 0.082;
      } else if (diasParaTransferencia >= 21 && diasParaTransferencia <= 30) {
        taxa = 0.069;
      } else if (diasParaTransferencia >= 31 && diasParaTransferencia <= 40) {
        taxa = 0.047;
      } else if (diasParaTransferencia >= 41 && diasParaTransferencia <= 50) {
        taxa = 0.017;
      } else {
        console.error("Taxa não aplicável");
      }

      return taxa;
    }

    calcularDiasParaTransferencia(dataTransferencia: string): number {
      const dataTransferenciaObj = new Date(dataTransferencia);
      const hoje = new Date();
      const umDiaEmMilissegundos = 24 * 60 * 60 * 1000;
      return Math.floor((dataTransferenciaObj.getTime() - hoje.getTime()) / umDiaEmMilissegundos);
    }
  }
