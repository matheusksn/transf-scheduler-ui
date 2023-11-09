export class TransferenciaRequestDTO {
  contaOrigem: string;
  contaDestino: string;
  valor: number;
  dataTransferencia: string;

  constructor(contaOrigem: string, contaDestino: string, valor: number, dataTransferencia: string) {
    this.contaOrigem = contaOrigem;
    this.contaDestino = contaDestino;
    this.valor = valor;
    this.dataTransferencia = dataTransferencia;
  }
}
