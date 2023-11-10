export interface Transferencia {
  id: number;
  contaOrigem: string;
  contaDestino: string;
  valor: number;
  valorComTaxa:number;
  taxa: number;
  dataTransferencia: string;
  dataAgendamento: string; 
  status: string;
}
