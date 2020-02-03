import { Component, OnInit } from '@angular/core';
import { EmojisService } from '../emojis.service';

@Component({
  selector: 'app-fav-emojis',
  templateUrl: './fav-emojis.component.html'
})
export class FavEmojisComponent implements OnInit {

	emojis = []
	pageSize = 50
	page = 1

  constructor(
  	private emojisService: EmojisService
  ) { }

  onScroll() {
    this.page++
  }

  ngOnInit() {
  	this.emojis = this.emojisService.getFavEmojis()
  }

}
