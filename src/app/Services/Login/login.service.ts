import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import jwt_decode, { JwtPayload } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private httpClient: HttpClient) {}

  login(data: any): Observable<any> {
    return this.httpClient.post('http://localhost:5000/login', data, {
      headers: { 'Content-Type': 'application/json' },
      observe: 'response',
    });
  }

  logout() {
    localStorage.removeItem('Token');
    localStorage.removeItem('isAdmin');
  }

  saveToken(token: string) {
    localStorage.setItem('Token', token);
    type customeType = JwtPayload & { roles: Array<string> };
    var decoded_token = jwt_decode<customeType>(token);
    console.log(decoded_token);
    decoded_token.roles.forEach((role) => {
      if (role == 'admin') localStorage.setItem('isAdmin', 'true');
    });
  }

  getToken() {
    return localStorage.getItem('Token');
  }
}
