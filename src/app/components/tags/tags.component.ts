import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Tags } from 'src/app/helper/dto/tags';
import { Tweet } from 'src/app/helper/dto/tweet';
import { TagsService } from 'src/app/services/tags.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {

  trendingTags!: Tags[];
  @Output() tagsTweetEmitter = new EventEmitter<Tweet[]>();
  @Input() updateTags!: boolean;

  constructor(private tags: TagsService, private _toastrService: ToastrService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.updateTags) {
      this.getTrendingTags();
    }
  }

  ngOnInit(): void {
    this.getTrendingTags();
  }

  public getTrendingTags() {
    this.tags.getTrendingTagsFromApi().subscribe(response => {
      this.trendingTags = response;
    },
      errorObj => {
        this._toastrService.error(errorObj.error.message, 'Fetching trending tags failed !!!', { timeOut: 2000 });
      })
  }

  public getTrendingTweets(tagName: string) {
    this.tags.getTrendingTweetByTagFromApi(tagName.replace('#', "")).subscribe(response => {
      this.sendTrendingTweetsToHome(response);
    },
      errorObj => {
        this.sendTrendingTweetsToHome(null);
        this._toastrService.error(errorObj.error.message, 'Fetching trending tweets failed !!!', { timeOut: 2000 });
      })
  }

  private sendTrendingTweetsToHome(tweets: any) {
    this.tagsTweetEmitter.emit(tweets);
  }

}
