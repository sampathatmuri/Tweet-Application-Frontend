import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Tweet } from 'src/app/helper/dto/tweet';
import { StorageService } from 'src/app/services/storage.service';
import { TweetService } from 'src/app/services/tweet.service';

@Component({
  selector: 'app-update-tweet',
  templateUrl: './update-tweet.component.html',
  styleUrls: ['./update-tweet.component.css']
})
export class UpdateTweetComponent implements OnInit {

  @Output() updateTweetEvent = new EventEmitter<Tweet>();

  @Output() isEnabledChange = new EventEmitter<boolean>();

  @Input() currTweet!: Tweet;

  @Input() isEnabled: boolean = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _tweetService: TweetService,
    private _toastrService: ToastrService,
    private storageService: StorageService,) { }

  ngOnInit(): void {
    this.updateTweetForm.setValue({ 'message': this.currTweet.message });
  }

  updateTweetForm = this._formBuilder.group({
    message: ['', [Validators.required, Validators.maxLength(144)]]
  });

  updateTweet(updatedMsg: string): void {
    let emailId = this.storageService.getId();
    let tweetId = this.currTweet?.tweetId;
    this._tweetService.updateTweetFromApi(emailId!, tweetId, { "message": updatedMsg }).subscribe(response => {
      this.updateTweetEvent.emit(response);
      this._toastrService.success('Updated Successfully', 'Success', { timeOut: 1000, });
    },
      errorObj => {
        this._toastrService.error(errorObj.error.message, 'Update tweets failed !!!', { timeOut: 2000 });
      })
  }

  emitCancelEnableEvent(){
    this.isEnabledChange.emit(false)
  }

  get message() {
    return this.updateTweetForm.get('message');
  }
}
