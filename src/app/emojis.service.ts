import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface EmojisRemoteObject {
    [index: string]: string;
}

export interface Emoji {
    name: string;
    ref: string;
    fav: boolean;
    deleted: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class EmojisService {

	private url = 'https://api.github.com/emojis'	
	private emojis = []
	private favEmojis = []
	private deletedEmojis = []
	private searchedEmojis = []

  constructor(
  	private http: HttpClient
  ) {
  	this.http.get(this.url).subscribe(this.fillData.bind(this))  	
  }

  fillData(data: EmojisRemoteObject) {
		for(let key in data){
			this.emojis.push({
				name: key,
				ref: data[key],
				deleted: false,
				fav: false
			})			
  	}  	

  	this.syncLocalEmojis()
  }

  syncLocalEmojis(){
  	const ls = window.localStorage
  	if(!ls){
  		return
  	}

  	if(ls.favEmojis){  		
  		const localFavEmojis = JSON.parse(ls.favEmojis)
  		localFavEmojis.forEach(emoName => {
  			const emoji = this.emojis.find(el => el.name === emoName)
  			if(emoji){
  				this.toggleFavEmoji(emoji)
  			}
  		})
  	}

  	if(ls.deletedEmojis){
  		const localDeletedEmojis = JSON.parse(ls.deletedEmojis)
  		localDeletedEmojis.forEach(emoName => {
  			const emoji = this.emojis.find(el => el.name === emoName)
  			if(emoji){
  				this.toggleDeletedEmoji(emoji)
  			}
  		})
  	}
  }

  updateLocalFavEmojis(){
  	const ls = window.localStorage
  	if(!ls){
  		return
  	}
  	const favNames = this.favEmojis.map(em => em.name)
  	ls.favEmojis = JSON.stringify(favNames)
  }

  updateLocalDeletedEmojis(){
  	const ls = window.localStorage
  	if(!ls){
  		return
  	}
  	const deletedNames = this.deletedEmojis.map(em => em.name)
  	ls.deletedEmojis = JSON.stringify(deletedNames)
  }

  getEmojis(){
  	return this.emojis
  }

  getFavEmojis(){
  	return this.favEmojis
  }

  getDeletedEmojis(){
  	return this.deletedEmojis
  }

  getSearchedEmojis(query: string){
  	return this.emojis.filter(emo => emo.name.indexOf(query) > -1)
  }

  toggleDeletedEmoji(emo:Emoji){
  	if(emo.deleted){  	
  		const el = this.deletedEmojis.find(el => el.name === emo.name)
  		const index = this.deletedEmojis.indexOf(el)
  		this.deletedEmojis.splice(index, 1)
  		emo.deleted = false
  	} else {
  		emo.deleted = true
  		this.deletedEmojis.push(emo)
  		if(emo.fav){
  			this.toggleFavEmoji(emo)
  		}
  	}

  	this.updateLocalDeletedEmojis()
  }

  toggleFavEmoji(emo:Emoji){
  	if(emo.fav){  	
  		const el = this.favEmojis.find(el => el.name === emo.name)
  		const index = this.favEmojis.indexOf(el)
  		this.favEmojis.splice(index, 1)
  		emo.fav = false
  	} else {
  		emo.fav = true
  		this.favEmojis.push(emo)
  	}

  	this.updateLocalFavEmojis()
  }

}