import { Component, OnInit } from '@angular/core';
import * as fileSaver from 'file-saver';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/dto/user';
import { FileService } from 'src/app/services/file.service';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  private user!: User;

  constructor(private fileService: FileService,
    private toastrService: ToastrService,
    private userService: UserService,
    private storageService: StorageService) { }

  ngOnInit(): void {
    this.getCurrentUser(this.storageService.getId());
  }

  private getCurrentUser(emailId: string | null) {
    if (emailId != null) {
      this.userService.getUserByMailId(emailId).subscribe(response => {
        this.user = response;
      },
        errorObj => {
          this.toastrService.error(errorObj.error.message, 'Failed !!!', { timeOut: 2000 });
        })
    }
  }

  downloadTweets(emailId:string) {
    this.fileService.downloadFile(emailId).subscribe((response) => {
      response = this.filterTweetIdAndRepliesFromResponse(response);
      const blob: any = new Blob([response], { type: 'text/json; charset=utf-8' });
      const url = window.URL.createObjectURL(blob);
      fileSaver.saveAs(blob, 'tweets.json');
      this.toastrService.success('File downloaded successfully', 'Success', { timeOut: 1000, });
    },
      (errorObj: any) => {
        this.toastrService.error("Error downloading the file", 'Failed !!!', { timeOut: 2000 });
      })
  }

  private filterTweetIdAndRepliesFromResponse(response: any): any {
    return response.map((obj: any) => {
      const { tweetId, replies, ...rest } = obj;
      return JSON.stringify([rest]);
    })
  }

  get isCurrentUserNull(): boolean {
    return this.user == null;
  }

  get currentUser() {
    return this.user;
  }
}
