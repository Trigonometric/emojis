import { Component, OnInit } from '@angular/core'
import { Router, ActivationEnd, ActivatedRoute } from '@angular/router'
import { Observable } from 'rxjs'
import { filter } from 'rxjs/operators'

import { EmojisService } from '../emojis.service'

@Component({
  selector: 'app-searched-emojis',
  templateUrl: './searched-emojis.component.html'
})
export class SearchedEmojisComponent implements OnInit {

	emojis = []
	pageSize = 50
	page = 1
	currentRoute: Observable<ActivationEnd>

  constructor(
  	private emojisService: EmojisService,
  	private activatedRoute: ActivatedRoute,
  	private router: Router
  ) {
  	this.currentRoute = router.events.pipe(
      filter(evt => evt instanceof ActivationEnd)
    ) as Observable<ActivationEnd>
  }

  onScroll() {
    this.page++
  }

  updateEmojis(query){
  	this.emojis = []
		this.emojis = this.emojisService.getSearchedEmojis(query)
  }

  ngOnInit() {  	
  	const firstQuery = this.activatedRoute.snapshot.params.query
  	
  	this.updateEmojis(firstQuery)
  	
  	this.currentRoute.subscribe(e => {
			const query = e.snapshot.params.query				
			this.updateEmojis(query)
		})
	}

}