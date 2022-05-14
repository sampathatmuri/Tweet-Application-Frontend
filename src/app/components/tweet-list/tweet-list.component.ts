import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Tweet } from 'src/app/helper/dto/tweet';
import { StorageService } from 'src/app/services/storage.service';
import { TweetService } from 'src/app/services/tweet.service';

@Component({
  selector: 'app-tweet-list',
  templateUrl: './tweet-list.component.html',
  styleUrls: ['./tweet-list.component.css']
})
export class TweetListComponent implements OnInit {

  private enabledIndex: number = -1;
  private replyIndex: number = -1;
  toggler: boolean = true
  @Input() tweetsInfo!: Tweet[];
  @Output() updateTagsEventEmitter = new EventEmitter<boolean>();


  constructor(private tweetService: TweetService,
    private _toastrService: ToastrService,
    private storageService: StorageService
  ) { }

  ngOnInit(): void {
    this.getAllTweets();
  }

  getAllTweets(): void {
    this.tweetService.getAllTweetsFromApi().subscribe(response => {
      this.tweetsInfo = response;
    },
      errorObj => {
        this._toastrService.error(errorObj.error.message, 'Fetching tweets failed !!!', { timeOut: 2000 });
      })
  }

  likeTweet(index: number): void {
    let emailId = this.storageService.getId();
    let tweetId = this.tweetsInfo[index].tweetId;
    this.tweetService.likeTweetFromApi(emailId!, tweetId).subscribe(response => {
      this.tweetsInfo[index].likeCount = response.likeCount;
    },
      errorObj => {
        this._toastrService.error(errorObj.error.message, 'Like tweets failed !!!', { timeOut: 2000 });
      })
  }


  deleteTweet(index: number): void {
    let emailId = this.storageService.getId();
    let tweetId = this.tweetsInfo[index].tweetId;
    this.tweetService.deleteTweetFromApi(emailId!, tweetId).subscribe(response => {
      this.tweetsInfo = this.tweetsInfo.filter(item => item.tweetId !== tweetId);
      this._toastrService.success('Deleted Successfully', 'Success', { timeOut: 1000, });
    },
      errorObj => {
        this._toastrService.error(errorObj.error.message, 'Delete tweets failed !!!', { timeOut: 2000 });
      })
  }

  updateTweet(index: number, updatedMsg: string): void {
    let emailId = this.storageService.getId();
    let tweetId = this.tweetsInfo[index].tweetId;
    this.tweetService.updateTweetFromApi(emailId!, tweetId, { "message": updatedMsg }).subscribe(response => {
      this.tweetsInfo[index].message = response.message;
      this.resetMsgBoxEnabledIndex();
      this.updateTagsPanel();
      this._toastrService.success('Updated Successfully', 'Success', { timeOut: 1000, });
    },
      errorObj => {
        console.log(errorObj)
        this._toastrService.error(errorObj.error.message, 'Update tweets failed !!!', { timeOut: 2000 });
      })
  }

  private updateTagsPanel() {
    this.updateTagsEventEmitter.emit(true);
  }
  
  private updateTweets(tweet: Tweet) {
    this.tweetsInfo?.push(tweet);
  }

  addNewTweet(tweet: Tweet) {
    this.updateTweets(tweet);
    this.updateTagsPanel();
  }

  isSameUser(currentEmailId: string): boolean {
    return this.storageService.getId() === currentEmailId;
  }

  filterByEmailId(emailId: string) {
    this.tweetsInfo = this.tweetsInfo?.filter(tweet => tweet.emailId == emailId);
  }

  sortByLikes() {
    this.tweetsInfo = this.tweetsInfo?.sort((t1, t2) => { return 0 - (t1.likeCount < t2.likeCount ? -1 : 1) });
  }

  sortByDate() {
    this.tweetsInfo = this.tweetsInfo?.sort((t1, t2) => { return 0 - (t1.createdAt < t2.createdAt ? -1 : 1) })
  }

  updateRepliedTweet(tweet: Tweet, currIndex: number) {
    this.tweetsInfo[currIndex] = tweet
  }

  editCurrentTweet(currIndex: number): void {
    if (this.enabledIndex === currIndex)
      this.resetMsgBoxEnabledIndex();
    else
      this.enabledIndex = currIndex;
  }

  showRepliesForCurrentTweet(currIndex: number): void {
    if (this.replyIndex === currIndex)
      this.resetTogglerIndex();
    else {
      this.replyIndex = currIndex;
    }
  }

  isMsgBoxEnabled(currIndex: number): boolean {
    return this.enabledIndex == currIndex;
  }

  isTogglerEnabled(currIndex: number): boolean {
    return this.replyIndex === currIndex;
  }

  resetMsgBoxEnabledIndex() {
    this.enabledIndex = -1;
  }

  resetTogglerIndex() {
    this.replyIndex = -1
  }

  get isTweetsEmpty(): boolean {
    return this.tweetsInfo == null || this.tweetsInfo?.length == 0;
  }

  get tweets(): any {
    return this.tweetsInfo;
  }

}
