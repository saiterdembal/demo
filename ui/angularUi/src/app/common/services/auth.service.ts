import { Injectable } from '@angular/core';
import { LoginUser } from '../../model/loginUser';
import { RegisterUser } from '../../model/registerUser';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  TOKEN_KEY = 'token';
  path = environment.path;
  constructor(private http: HttpClient,
              private router: Router) { }

  login(loginUser: LoginUser) {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    this.http.post(this.path + '/user/login', loginUser, { headers: headers }).subscribe(data => {
      if (data) {
        this.saveToken(data['token']);
        alert('Login is successfull');
        console.log(data['token']);
        this.router.navigate(['/home']);
      }
    });
  }

  register(registerUser: RegisterUser) {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    this.http.post(this.path + '/user/register', registerUser, { headers: headers }).subscribe(data => {
      if (data) {
        alert('Register process is successfull');
        this.saveToken(data['token']);
        console.log(data['token']);
        this.router.navigate(['/home']);
      } else {
        alert('An error occurred');
      }
    });
  }
  saveToken(token) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }
  logOut() {
    localStorage.removeItem(this.TOKEN_KEY);
    this.router.navigate(['/home']);
  }
  loggedIn() {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }
  getToken() {
    return localStorage.getItem(this.TOKEN_KEY);
  }
}


