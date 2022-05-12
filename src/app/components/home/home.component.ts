import { Component, OnInit } from '@angular/core';
import { Tweet } from 'src/app/helper/dto/tweet';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  ReceivedTweets!: Tweet[];
  updateTags: boolean = false;

  constructor(
  ) { }

  ngOnInit(): void {
  }

  getTrendingTweetsFromTags(tweets: Tweet[]) {
    this.ReceivedTweets = tweets;
  }

  getTweetsOfUserFromUsersList(tweets: Tweet[]) {
    this.ReceivedTweets = tweets;
  }

  getTagsUpdateStatus(updateTags: boolean) {
    this.updateTags = updateTags;
  }

}
