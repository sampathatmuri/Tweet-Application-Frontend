import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Tweet } from 'src/app/helper/dto/tweet';
import { User } from 'src/app/helper/dto/user';
import { FileService } from 'src/app/services/file.service';
import { StorageService } from 'src/app/services/storage.service';
import { TweetService } from 'src/app/services/tweet.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  private usersInfo!: User[];
  @Output() userTweetEmitter = new EventEmitter<Tweet[]>();

  constructor(private userService: UserService,
    private _toastrService: ToastrService,
    private tweetService: TweetService,
    private storageService: StorageService,
    private fileService: FileService) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  private getAllUsers(): any {
    this.userService.getAllUsersFromApi().subscribe(response => {
      this.usersInfo = response;
    },
      errorObj => {
        this._toastrService.error(errorObj.error.message, 'Fetching users failed !!!', { timeOut: 2000 });
      })
  }

  getAllTweetsOfUser(emailId: string): void {
    this.tweetService.getAllTweetsOfUserFromApi(emailId).subscribe(response => {
      this.sendTweetsOfUserToHome(response)
    },
      errorObj => {
        this.sendTweetsOfUserToHome(null)
        this._toastrService.error(errorObj.error.message, 'Failed !!!', { timeOut: 2000 });
      })
  }

  private sendTweetsOfUserToHome(tweets: any) {
    this.userTweetEmitter.emit(tweets);
  }

  get isUsersEmpty(): boolean {
    return this.usersInfo == null;
  }

  get users(): any {
    return this.usersInfo;
  }
}
