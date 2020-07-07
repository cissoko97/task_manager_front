import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(private fb: FormBuilder, private auhtService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  loginSubmit() {
    this.auhtService
      .login(this.loginForm.value)
      .subscribe((res) => {
        console.log(res);
      });
  }
}
