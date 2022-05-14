import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, ValidationErrors, Validators } from '@angular/forms';
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

  registerForm = this._formBuilder.group({
    firstName: ['', [Validators.required, Validators.maxLength(25), Validators.pattern('^[a-zA-Z]+$')]],
    lastName: ['', [Validators.required, Validators.maxLength(25), Validators.pattern('^[a-zA-Z]+$')]],
    emailId: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    password: ['', [Validators.required, Validators.pattern('((?=.*\\d)(?=.*[a-zA-Z])\\S{6,20})')]],
    confirmPassword: ['', [Validators.required], [this.confirmPswdValidator()]],
    contactNumber: ['', [Validators.required, Validators.pattern('^\\d{10}$')]],
  })
  
  ngOnInit(): void {
  }
  
  register() {
    this._registrationService.postUser(this.registerForm.value).subscribe(
      response => {
        this._toastrService.success('Signup successfull', 'Success', { timeOut: 2000 });
        setTimeout(() => {
          this.registerForm.reset();
          this._router.navigate(['/login']);
        }, 1000);
      },
      errorObj => {
        this._toastrService.error(JSON.parse(errorObj.error).message, 'Signup Failed!!!', { timeOut: 2000 });
      }
    );
  }
  
  checkIfPasswordsAreDifferent(pass: string, conpass: string): Observable<boolean> {
    return of(pass != conpass);
  }

  confirmPswdValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.checkIfPasswordsAreDifferent(this.registerForm.controls['password'].value,
        this.registerForm.controls['confirmPassword'].value).pipe(
          map(res => {
            return res ? { didnotMatch: true } : null;
          })
        )
    }
  }

  get firstName() {
    return this.registerForm.get('firstName');
  }
  get lastName() {
    return this.registerForm.get('lastName');
  }
  get emailId() {
    return this.registerForm.get('emailId');
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
    return this.registerForm.get('contactNumber');
  }
}
