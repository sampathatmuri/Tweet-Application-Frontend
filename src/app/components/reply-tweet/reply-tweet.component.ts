import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Tweet } from 'src/app/dto/tweet';
import { StorageService } from 'src/app/services/storage.service';
import { TweetService } from 'src/app/services/tweet.service';

@Component({
  selector: 'app-reply-tweet',
  templateUrl: './reply-tweet.component.html',
  styleUrls: ['./reply-tweet.component.css']
})
export class ReplyTweetComponent implements OnInit {

  @Input() currTweet!: Tweet;
  @Output() repliedTweetEvent = new EventEmitter<Tweet>();

  constructor(
    private formBuilder: FormBuilder,
    private tweetService: TweetService,
    private toastrService: ToastrService,
    private storageService: StorageService,
  ) { }

  ngOnInit(): void {
  }

  replyForm = this.formBuilder.group({
    message: ['', [Validators.required, Validators.maxLength(144)]]
  });

  postReply(): void {
    let emailId = this.storageService.getId();
    let tweetId = this.currTweet?.tweetId;
    this.tweetService.replyTweetFromApi(emailId!, tweetId, this.replyForm.value).subscribe(response => {
      this.repliedTweetEvent.emit(response);
      this.toastrService.success('Reply Posted Successfully', 'Success', { timeOut: 1000, });
    },
      errorObj => {
        this.toastrService.error(errorObj.error.message, 'Failed !!!', { timeOut: 2000 });
      })
  }

  get message() {
    return this.replyForm.get('message');
  }
}
