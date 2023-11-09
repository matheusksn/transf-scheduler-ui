import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmacao-modal',
  templateUrl: './confirmacao-modal.component.html',
  styleUrls: ['./confirmacao-modal.component.css']
})
export class ConfirmacaoModalComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmacaoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  fecharModal(confirmado: boolean) {
    this.dialogRef.close(confirmado);
  }
}
