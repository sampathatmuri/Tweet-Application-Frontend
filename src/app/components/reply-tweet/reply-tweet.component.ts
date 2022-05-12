import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Tweet } from 'src/app/helper/dto/tweet';
import { StorageService } from 'src/app/services/storage.service';
import { TweetService } from 'src/app/services/tweet.service';

@Component({
  selector: 'app-reply-tweet',
  templateUrl: './reply-tweet.component.html',
  styleUrls: ['./reply-tweet.component.css']
})
export class ReplyTweetComponent implements OnInit {

  @Output() repliedTweetEvent = new EventEmitter<Tweet>();

  @Input() currTweet!: Tweet;
  constructor(
    private _formBuilder: FormBuilder,
    private _tweetService: TweetService,
    private _toastrService: ToastrService,
    private storageService: StorageService,
  ) { }

  ngOnInit(): void {
  }

  replyForm = this._formBuilder.group({
    message: ['', [Validators.required, Validators.maxLength(144)]]
  });

  postReply(): void {
    let emailId = this.storageService.getId();
    let tweetId = this.currTweet?.tweetId;
    console.log(JSON.stringify(this.currTweet))
    console.log(this.replyForm.value)
    this._tweetService.replyTweetFromApi(emailId!, tweetId, this.replyForm.value).subscribe(response => {
      this.repliedTweetEvent.emit(response);
      this._toastrService.success('Reply Posted Successfully', 'Success', { timeOut: 1000, });
    },
      errorObj => {
        this._toastrService.error(errorObj.error.message, 'Reply tweets failed !!!', { timeOut: 2000 });
      })
  }

  get reply() {
    return this.replyForm.get('reply');
  }
}
