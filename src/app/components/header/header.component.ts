import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private _storageService: StorageService,
    private _router: Router,
    private _toastrService: ToastrService,
  ) { }

  ngOnInit(): void {
  }

  logout() {
    this._storageService.signOut();
    var login = this._storageService.validateToken();
    if(login == false) {
      this._toastrService.success('Your request is Successful', 'Success', { timeOut: 2000, });
      setTimeout(() => {
        this._router.navigate(['/login']);
      }, 2000);
    }
  }

}
