import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BotService {

  constructor(private http: HttpClient) {}

  sendMessage(message: string): Observable<any> {
    const body = { text: message };
    return this.http.post(`http://localhost:3000/chat`, body);
  }
}