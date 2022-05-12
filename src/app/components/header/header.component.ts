import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public toggler = true;
  constructor(private _storageService: StorageService) { }

  ngOnInit(): void {
  }

  isUserLoggedIn():boolean{
    return this._storageService.validateToken();
  }
}
