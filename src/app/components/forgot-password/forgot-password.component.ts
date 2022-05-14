import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map, Observable, of } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  private receivedOTP!: string;
  public isOTPSent: boolean = false;

  constructor(private http: HttpClient,
    private _formBuilder: FormBuilder,
    private authService: AuthService,
    private _toastrService: ToastrService,
    private _router: Router,
    private _storageService: StorageService,
  ) { }

  ngOnInit(): void {
  }

  resetPswdForm = this._formBuilder.group({
    emailId: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    sentOTP: ['', [Validators.required, Validators.pattern('^\\d{4}$')], [this.otpValidator()]],
    newPassword: ['', [Validators.required, Validators.minLength(6), Validators.pattern('((?=.*\\d)(?=.*[a-zA-Z])\\S{6,20})')]],
    confirmPassword: ['', [Validators.required], [this.confirmPswdValidator()]],
  });

  checkIfPasswordsAreDifferent(pass: string, conpass: string): Observable<boolean> {
    return of(pass != conpass);
  }

  checkIfOTPsAreDifferent(sentOTP: string, receivedOTP: string): Observable<boolean> {
    return of(receivedOTP != sentOTP);
  }

  confirmPswdValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.checkIfPasswordsAreDifferent(this.resetPswdForm.controls['newPassword'].value,
        this.resetPswdForm.controls['confirmPassword'].value).pipe(
          map(res => {
            return res ? { didnotMatch: true } : null;
          })
        )
    }
  }

  otpValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.checkIfOTPsAreDifferent(this.resetPswdForm.controls['sentOTP'].value, this.receivedOTP).pipe(
        map(res => {
          return res ? { didnotMatch: true } : null;
        })
      )
    }
  }

  sendOTP() {
    const OTP: string = Math.floor(1000 + Math.random() * 9000).toString();
    this.authService.sendOTP(this.emailId?.value, OTP).subscribe(response => {
      this.setOTPandSentStatus(OTP)
      this._toastrService.success('OTP sent to your mail', 'Success', { timeOut: 1000, });
      console.log(response)
    }, err => {
      this.resetOTPandSentStatus();
      this._toastrService.error(JSON.parse(err.error).message, 'Failed', { timeOut: 2000, });
    })
  }

  resetPassword() {
    this.authService.changePassword(this.emailId?.value, this.newPassword?.value).subscribe(response => {
      this.resetOTPandSentStatus();
      this._toastrService.success(response.body, 'Success', { timeOut: 1000, });
      setTimeout(() => {
        this.resetPswdForm.reset();
        this._storageService.removeToken();
        this._router.navigate(['/login'])
      }, 1000);
    }, err => {
      this._toastrService.error(JSON.parse(err.error).message, 'Failed', { timeOut: 2000, });
    })

  }

  private setOTPandSentStatus(OTP: string) {
    this.receivedOTP = OTP;
    this.isOTPSent = true
  }

  private resetOTPandSentStatus() {
    this.receivedOTP = ""
    this.isOTPSent = false
  }

  get sentOTP() {
    return this.resetPswdForm.get('sentOTP');
  }

  get emailId() {
    return this.resetPswdForm.get('emailId');
  }

  get newPassword() {
    return this.resetPswdForm.get('newPassword');
  }

  get confirmPassword() {
    return this.resetPswdForm.get('confirmPassword');
  }
}
