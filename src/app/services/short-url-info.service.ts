import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShortUrlInfoService {
  private baseUrl = 'https://localhost:7233';

  constructor(private httpClient: HttpClient) {
  }

  getShortUrlInfoById(id: number, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });
    const url = `${this.baseUrl}/api/Link/${id}`;

    return this.httpClient.get(url, {headers});
  }
}
