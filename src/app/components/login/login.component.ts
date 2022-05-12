import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private _formBuilder: FormBuilder,
    private _storageService: StorageService,
    private _authService: AuthService,
    private _router: Router,
    private _toastrService: ToastrService,
  ) { }

  loginForm = this._formBuilder.group({
    emailId: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    password: ['', [Validators.required, Validators.pattern('((?=.*\\d)(?=.*[a-zA-Z])\\S{6,20})')]],
  })

  ngOnInit(): void {
    this.login();
  }

  login(): void {
    var login = this._storageService.validateToken();
    if (login == true) {
      this._router.navigate(['/home'])
    }
  }

  onSubmit() {
    this._authService.authenticate(this.loginForm.value).subscribe(
      response => {
        const id = this.emailId?.value;
        this._storageService.saveId(id);
        const token = response.body.token;
        this._storageService.saveToken(token);
        this._toastrService.success('Login Successful', 'Success', { timeOut: 1000, });
        setTimeout(() => {
          this.loginForm.reset();
          this.login();
        }, 1000);
      },
      errorObj => {
        this._toastrService.error(errorObj.error.message, 'Login Failed !!!', { timeOut: 2000, });
      }
    )
  }

  get emailId() {
    return this.loginForm.get('emailId');
  }
  get password() {
    return this.loginForm.get('password');
  }
}
