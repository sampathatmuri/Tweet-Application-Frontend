import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map, Observable, of } from 'rxjs';
import { RegistrationService } from 'src/app/services/registration.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private _formBuilder: FormBuilder,
    private _registrationService: RegistrationService,
    private _toastrService: ToastrService,
    private _router: Router,
  ) { }

  registerForm = this._formBuilder.group ({
    firstName: ['', [Validators.required,Validators.maxLength(25), Validators.pattern('^[a-zA-Z]+$')]],
    lastName: ['', [Validators.required,Validators.maxLength(25), Validators.pattern('^[a-zA-Z]+$')]],
    email: ['', [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    password: ['', [Validators.required,Validators.minLength(8), Validators.pattern('^.*(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&+=]).*$')]],
    confirmPassword: ['', [Validators.required],[this.customValidator()]],
    mobileNo: ['', [Validators.required,Validators.maxLength(10), Validators.minLength(10), Validators.pattern('^[0-9]+$')]],
  })

  ngOnInit(): void {
  }
  checkIfPasswordsAreDifferent(pass: string, conpass: string): Observable<boolean> {
    return of(pass != conpass);
  }
  customValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.checkIfPasswordsAreDifferent(this.registerForm.controls['password'].value,
        this.registerForm.controls['confirmPassword'].value).pipe(
          map(res => {
            return res ? { didnotMatch: true } : null;
          })
      )
    }
  }

  register() {
    this._registrationService.postUser(this.registerForm.value).subscribe(
      response => {
        this._toastrService.success('Your request is Successful', 'Success', { timeOut: 2000 });
        setTimeout( () => {
          this.registerForm.reset();
          this._router.navigate(['/']);
        }, 2000);
      },
      error => {
        this._toastrService.error(error.error, 'Error', { timeOut: 2000 });
      }
    );
  }

  get firstName() {
    return this.registerForm.get('firstName');
  }
  get lastName() {
    return this.registerForm.get('lastName');
  }
  get email() {
    return this.registerForm.get('email');
  }
  get username() {
    return this.registerForm.get('username');
  }
  get password() {
    return this.registerForm.get('password');
  }
  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }
  get mobileNo() {
    return this.registerForm.get('mobileNo');
  }
}
