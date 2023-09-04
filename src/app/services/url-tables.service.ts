import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UrlTablesService {
  private baseUrl = 'https://localhost:7233';

  constructor(private httpClient: HttpClient) {
  }

  createLink(linkData: any, token: string): Observable<any> {
    const url = `${this.baseUrl}/api/Link`;
    const headers = new HttpHeaders({
      'accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });

    return this.httpClient.post(url, linkData, {headers});
  }

  listLinks(): Observable<any[]> {
    const url = `${this.baseUrl}/api/Link`;

    return this.httpClient.get<any[]>(url);
  }

  deleteLinkById(id: number, token: string): Observable<void> {
    const url = `${this.baseUrl}/api/Link/${id}`;
    const headers = new HttpHeaders({
      'accept': '*/*',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });

    return this.httpClient.delete<void>(url, {headers});
  }
}
