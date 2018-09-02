import { Component, OnInit } from '@angular/core';
import { RegisterUser } from '../model/registerUser';
import { AuthService } from '../common/services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerUser: RegisterUser = {email : '', password: '', firstName: '', lastName : ''};
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }
  register(registerUser: RegisterUser) {
    this.authService.register(registerUser);
  }
}
