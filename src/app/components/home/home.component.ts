import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TweetService } from 'src/app/services/tweet.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

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

  post() {
    this._tweetService.postTweet(this.tweetForm.value).subscribe(
      response => {
        this._toastrService.success('Your request is Successful', 'Success', { timeOut: 2000 });
        setTimeout( () => {
          this.tweetForm.reset();
        }, 2000);
      },
      error => {
        this._toastrService.error(error.error, 'Error', { timeOut: 2000 });
      }
    );
  }

  get tweet() {
    return this.tweetForm.get('tweet');
  }
  get tag() {
    return this.tweetForm.get('tag');
  }
}
