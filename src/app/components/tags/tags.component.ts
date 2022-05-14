import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Tags } from 'src/app/dto/tags';
import { Tweet } from 'src/app/dto/tweet';
import { TagsService } from 'src/app/services/tags.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {

  private trendingTags!: Tags[];
  private tagsAvailable:boolean = true;
  @Output() tagsTweetEmitter = new EventEmitter<Tweet[]>();
  @Input() updateTags!: boolean;

  constructor(private tagService: TagsService, private toastrService: ToastrService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.updateTags) {
      this.getTrendingTags();
    }
  }

  ngOnInit(): void {
    this.getTrendingTags();
  }

  public getTrendingTags() {
    this.tagService.getTrendingTagsFromApi().subscribe(response => {
      this.trendingTags = response;
      this.setTagsAvailable(this.trendingTags);
    },
      errorObj => {
        this.toastrService.error(errorObj.error.message, 'Failed !!!', { timeOut: 2000 });
      })
  }

  public getTrendingTweets(tagName: string) {
    this.tagService.getTrendingTweetByTagFromApi(tagName.replace('#', "")).subscribe(response => {
      this.sendTrendingTweetsToHome(response);
    },
      errorObj => {
        this.sendTrendingTweetsToHome(null);
        this.toastrService.error(errorObj.error.message, 'Failed !!!', { timeOut: 2000 });
      })
  }

  private setTagsAvailable(tags:Tags[]){
    this.tagsAvailable = (this.tags != null && this.tags.length > 0);
  }

  private sendTrendingTweetsToHome(tweets: any) {
    this.tagsTweetEmitter.emit(tweets);
  }

  get isTrendingTagsAvailable(): boolean {
    return this.tagsAvailable;
  }

  get tags():Tags[]{
    return this.trendingTags;
  }

}
