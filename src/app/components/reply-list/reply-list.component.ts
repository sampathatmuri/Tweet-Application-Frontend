import { Component, Input, OnInit } from '@angular/core';
import { Tweet } from 'src/app/helper/dto/tweet';

@Component({
  selector: 'app-reply-list',
  templateUrl: './reply-list.component.html',
  styleUrls: ['./reply-list.component.css']
})
export class ReplyListComponent implements OnInit {

  @Input() tweet!:Tweet;
  
  constructor() { }

  ngOnInit(): void {
  }

}
