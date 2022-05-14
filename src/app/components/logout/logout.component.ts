import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  login: boolean = true;
  
  constructor(
    private _storageService: StorageService,
    private _router: Router,
    private _toastrService: ToastrService,
  ) { }

  ngOnInit(): void {
    this._storageService.removeToken();
    this.login = this._storageService.validateToken();
    if(this.login == false) {
      this._toastrService.success('Logged out Successfully', 'Success', { timeOut: 2000, });
      setTimeout(() => {
        this._router.navigate(['/login']);
      }, 2000);
    }
  }
}
