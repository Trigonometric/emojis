import { Component, Input } from '@angular/core';
import { EmojisService, Emoji } from '../emojis.service';

export type EmojiLocation = 'all' | 'fav' | 'deleted' | 'search'

@Component({
  selector: 'app-emoji',
  templateUrl: './emoji.component.html'
})
export class EmojiComponent {

	@Input() emoji: Emoji
	@Input() location: EmojiLocation

  constructor(
  	private emojisService: EmojisService
  ) { }

  toggleFav(){
  	this.emojisService.toggleFavEmoji(this.emoji)
  }

  toggleDeleted(){
  	this.emojisService.toggleDeletedEmoji(this.emoji)
  }

  deleteClick(){
  	switch (this.location){
  		case 'all': this.toggleDeleted(); break;
  		case 'fav': this.toggleFav(); break;
  		case 'search': this.toggleDeleted(); break;
  	}
  }

}
