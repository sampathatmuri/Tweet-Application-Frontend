import { Component, EventEmitter, Input, OnInit, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Tweet } from 'src/app/dto/tweet';
import { StorageService } from 'src/app/services/storage.service';
import { TweetService } from 'src/app/services/tweet.service';

@Component({
  selector: 'app-tweet-list',
  templateUrl: './tweet-list.component.html',
  styleUrls: ['./tweet-list.component.css']
})
export class TweetListComponent implements OnInit {

  private enabledTweetIndex: number = -1;
  private replyIndex: number = -1;
  tweetsAvailable: boolean = true;
  toggler: boolean = true
  updateTagsTrigger: boolean = true
  @Input() tweetsInfo!: Tweet[];
  @Output() updateTagsEventEmitter = new EventEmitter<boolean>();


  constructor(
    private tweetService: TweetService,
    private toastrService: ToastrService,
    private storageService: StorageService
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes['tweetsInfo'].firstChange)
      this.setTweetsAvailable(changes['tweetsInfo'].currentValue);
  }
  ngOnInit(): void {
    this.getAllTweets();
  }

  getAllTweets(): void {
    this.tweetService.getAllTweetsFromApi().subscribe(response => {
      this.tweetsInfo = response;
      this.setTweetsAvailable(this.tweetsInfo);
    },
      errorObj => {
        this.tweetsAvailable = false;
        this.toastrService.error(errorObj.error.message, 'Failed !!!', { timeOut: 2000 });
      })
  }

  likeTweet(index: number): void {
    let emailId = this.storageService.getId();
    let tweetId = this.tweetsInfo[index].tweetId;
    this.tweetService.likeTweetFromApi(emailId!, tweetId).subscribe(response => {
      this.tweetsInfo[index].likeCount = response.likeCount;
    },
      errorObj => {
        this.toastrService.error(errorObj.error.message, 'Failed !!!', { timeOut: 2000 });
      })
  }


  deleteTweet(index: number): void {
    let emailId = this.storageService.getId();
    let tweetId = this.tweetsInfo[index].tweetId;
    this.tweetService.deleteTweetFromApi(emailId!, tweetId).subscribe(response => {
      this.tweetsInfo = this.tweetsInfo.filter(item => item.tweetId !== tweetId);
      this.setTweetsAvailable(this.tweetsInfo);
      this.toastrService.success('Deleted Successfully', 'Success', { timeOut: 1000, });
    },
      errorObj => {
        this.toastrService.error(errorObj.error.message, 'Failed !!!', { timeOut: 2000 });
      })
  }

  private updateTagsPanel() {
    this.updateTagsEventEmitter.emit(this.updateTagsTrigger);
    this.updateTagsTrigger = !this.updateTagsTrigger
  }

  private updateTweets(tweet: Tweet) {
    this.tweetsInfo?.push(tweet);
  }

  addNewTweet(tweet: Tweet) {
    this.updateTweets(tweet);
    this.tweetsAvailable = true;
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

  updateTweet(tweet: Tweet, currIndex: number) {
    this.tweetsInfo[currIndex] = tweet;
    this.updateTagsPanel();
  }

  updateRepliedTweet(tweet: Tweet, currIndex: number) {
    this.tweetsInfo[currIndex] = tweet
  }

  editCurrentTweet(currIndex: number): void {
    if (this.enabledTweetIndex === currIndex)
      this.resetMsgBoxEnabledIndex();
    else
      this.enabledTweetIndex = currIndex;
  }

  showRepliesForCurrentTweet(currIndex: number): void {
    if (this.replyIndex === currIndex)
      this.resetTogglerIndex();
    else {
      this.replyIndex = currIndex;
    }
  }

  isMsgBoxEnabled(currIndex: number): boolean {
    return this.enabledTweetIndex == currIndex;
  }

  isTogglerEnabled(currIndex: number): boolean {
    return this.replyIndex === currIndex;
  }

  resetMsgBoxEnabledIndex() {
    this.enabledTweetIndex = -1;
  }

  resetTogglerIndex() {
    this.replyIndex = -1
  }

  private setTweetsAvailable(tweets: any) {
    this.tweetsAvailable = (tweets != null && tweets.length > 0);
  }

  get isTweetsAvailable(): boolean {
    return this.tweetsAvailable;
  }

  get tweets(): any {
    return this.tweetsInfo;
  }

}
