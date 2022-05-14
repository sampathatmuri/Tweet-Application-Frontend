import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Tweet } from 'src/app/dto/tweet';
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
    private formBuilder: FormBuilder,
    private tweetService: TweetService,
    private toastrService: ToastrService,
    private storageService: StorageService,) { }

  ngOnChanges(changes:SimpleChanges){
    this.updateTweetForm.setValue({ 'message': this.currTweet.message });
  }
  ngOnInit(): void {
  }

  updateTweetForm = this.formBuilder.group({
    message: ['', [Validators.required, Validators.maxLength(144)]]
  });

  updateTweet(updatedMsg: string): void {
    let emailId = this.storageService.getId();
    let tweetId = this.currTweet?.tweetId;
    this.tweetService.updateTweetFromApi(emailId!, tweetId, { "message": updatedMsg }).subscribe(response => {
      this.updateTweetEvent.emit(response);
      this.emitCancelEnableEvent();
      this.toastrService.success('Updated Successfully', 'Success', { timeOut: 1000, });
    },
      errorObj => {
        this.toastrService.error(errorObj.error.message, 'Failed !!!', { timeOut: 2000 });
      })
  }

  emitCancelEnableEvent(){
    this.updateTweetForm.setValue({ 'message': this.currTweet.message });
    this.isEnabledChange.emit(false)
  }

  get message() {
    return this.updateTweetForm.get('message');
  }
}
