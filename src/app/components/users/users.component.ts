import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private userService: UserService) { }

  usersInfo: any;

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(): any {
    this.userService.getAllUsersFromApi().subscribe(response => {
      this.usersInfo = response;
    })
  }

}
