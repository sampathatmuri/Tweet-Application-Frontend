import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Tweet } from 'src/app/dto/tweet';
import { User } from 'src/app/dto/user';
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
    private toastrService: ToastrService,
    private tweetService: TweetService) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  private getAllUsers(): any {
    this.userService.getAllUsersFromApi().subscribe(response => {
      this.usersInfo = response;
    },
      errorObj => {
        this.toastrService.error(errorObj.error.message, 'Failed !!!', { timeOut: 2000 });
      })
  }

  getAllTweetsOfUser(emailId: string): void {
    this.tweetService.getAllTweetsOfUserFromApi(emailId).subscribe(response => {
      this.sendTweetsOfUserToHome(response)
    },
      errorObj => {
        this.sendTweetsOfUserToHome([])
        this.toastrService.error(errorObj.error.message, 'Failed !!!', { timeOut: 2000 });
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
