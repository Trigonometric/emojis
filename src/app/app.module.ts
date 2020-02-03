import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { EmojiComponent } from './emoji/emoji.component';
import { FavEmojisComponent } from './fav-emojis/fav-emojis.component';
import { DeletedEmojisComponent } from './deleted-emojis/deleted-emojis.component';
import { AllEmojisComponent } from './all-emojis/all-emojis.component';
import { SearchedEmojisComponent } from './searched-emojis/searched-emojis.component';

@NgModule({
  declarations: [
    AppComponent,
    EmojiComponent,
    FavEmojisComponent,
    DeletedEmojisComponent,
    AllEmojisComponent,
    SearchedEmojisComponent
  ],
  imports: [
    InfiniteScrollModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: AllEmojisComponent, data:{title: 'Все'} },
      { path: 'favs', component: FavEmojisComponent, data:{title: 'Любимые'} },
      { path: 'deleted', component: DeletedEmojisComponent, data:{title: 'Удаленные'} },
      { path: 'search/:query', component: SearchedEmojisComponent, data:{title: 'Поиск'} },
      { path: '**', redirectTo: '' }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
