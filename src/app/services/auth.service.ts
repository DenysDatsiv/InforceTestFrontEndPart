// auth.service.ts
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7233/api/Auth/login';

  constructor(private http: HttpClient) {
  }

  login(credentials: any): Observable<any> {
    const headers = new HttpHeaders({
      'accept': '*/*',
      'Content-Type': 'application/json'
    });
    return this.http.post(this.apiUrl, JSON.stringify(credentials), {
      headers: headers
    });
  }

}
