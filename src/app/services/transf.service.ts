import { Injectable } from '@angular/core';
import { Transferencia } from '../models/transferencias';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TransferenciaRequestDTO } from '../models/transferenciaRequest';

@Injectable({
  providedIn: 'root'
})
export class TransfService {
  private apiUrl = 'http://localhost:8080/api/transferencias'; 

  constructor(private http: HttpClient) {}

  getTransferencias(): Observable<Transferencia[]> {
    return this.http.get<Transferencia[]>(this.apiUrl+ '/consultar');
  }

  agendarTransferencia(transferenciaRequest: TransferenciaRequestDTO): Observable<any> {
    const url = `${this.apiUrl}/agendar`;
    return this.http.post(url, transferenciaRequest);
  }
}
