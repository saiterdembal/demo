import { Component, OnInit } from '@angular/core';
import { LoginUser } from '../model/loginUser';
import { AuthService } from '../common/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService) { }
  user: any = {};

  ngOnInit() {
  }
  login(user: LoginUser) {
    this.authService.login(user);
 }

}
