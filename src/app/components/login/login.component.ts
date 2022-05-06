import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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
    emailId: [''],
    password: [''],
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

  submit() {
    this._authService.authenticate(this.loginForm.value).subscribe(
      response => {
        const id = this.loginForm.controls['emailId'].value;
        this._storageService.saveId(id);
        console.log("Output "+response.body);
        const token = response.body.token;
        this._storageService.saveToken(token);
        this._toastrService.success('Your request is Successful', 'Success', { timeOut: 2000, });
        setTimeout( () => {
          this.loginForm.reset();
          this.login();
        }, 2000);
      },
      error => {
        this._toastrService.error(error.error, 'Error', { timeOut: 2000, });
      }
    )
  }

  get username() {
    return this.loginForm.get('username');
  }
  get password() {
    return this.loginForm.get('password');
  }
}
