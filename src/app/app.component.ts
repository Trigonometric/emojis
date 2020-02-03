import { Component, OnInit } from '@angular/core'
import { Router, ActivationEnd } from '@angular/router'
import { Observable } from 'rxjs'
import { filter } from 'rxjs/operators'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent implements OnInit {
	
	title = 'Все'
	mobileNavOpen = false
	searchQuery = ''
	currentRoute: Observable<ActivationEnd>

	constructor(
		private router: Router
	) {
    this.currentRoute = router.events.pipe(
      filter(evt => evt instanceof ActivationEnd)
    ) as Observable<ActivationEnd>
	}

	searchSubmit(e){
		e.preventDefault()
		if(!this.searchQuery){
			return
		}
		this.router.navigate(['/search', this.searchQuery])
		this.searchQuery = ''
	}

	globalClick(e){
		let t = e.target

		if( t.matches('.header__burger') ){
			this.mobileNavOpen = true	
		} else if( !t.matches('.sidebar__search .search-form__input') ) {
			this.mobileNavOpen = false
		}
	}

	ngOnInit() {
		this.currentRoute.subscribe(e => {
			const sn = e.snapshot
			this.title = sn.data.title
			if(sn.params.query){
				this.title += ': "' + sn.params.query + '"'
			}
		})
  }

}
