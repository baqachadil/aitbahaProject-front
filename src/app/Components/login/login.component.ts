import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from 'src/app/Services/Login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginError: Error = new Error();

  constructor(private loginservice: LoginService) {}

  ngOnInit() {}

  login(f: NgForm) {
    let data = {
      username: f.controls.username.value,
      password: f.controls.password.value,
    };
    this.loginservice.login(data).subscribe(
      (res) => {
        this.loginError = new Error();
        this.loginservice.saveToken(res.body.token);
      },
      (err) => (this.loginError = err.error)
    );
  }
}
