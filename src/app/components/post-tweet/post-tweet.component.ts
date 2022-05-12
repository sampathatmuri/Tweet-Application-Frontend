import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Tweet } from 'src/app/helper/dto/tweet';
import { TweetService } from 'src/app/services/tweet.service';

@Component({
  selector: 'app-post-tweet',
  templateUrl: './post-tweet.component.html',
  styleUrls: ['./post-tweet.component.css']
})
export class PostTweetComponent implements OnInit {

  @Output() postTweetEvent = new EventEmitter<Tweet>();

  constructor(
    private _formBuilder: FormBuilder,
    private _tweetService: TweetService,
    private _toastrService: ToastrService,
  ) { }

  ngOnInit(): void {
  }

  tweetForm = this._formBuilder.group({
    message: ['', [Validators.required, Validators.maxLength(144)]]
  });

  postTweet() {
    this._tweetService.postTweet(this.tweetForm.value).subscribe(
      response => {
        this._toastrService.success('Tweet posted successfully', 'Success', { timeOut: 1000 });
        this.postTweetEvent.emit(response);
        setTimeout(() => {
          this.tweetForm.reset();
        }, 100);
      },
      errorObj => {
        this._toastrService.error(errorObj.error.errors, 'Bad Request', { timeOut: 2000 });
      }
    );
  }

  get tweet() {
    return this.tweetForm.get('tweet');
  }
}
