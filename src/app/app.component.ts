import { Component } from '@angular/core';

import {DungeonComponent} from './components/dungeon/dungeon.component';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {PartyAnnouncementComponent} from './components/party-announcement/party-announcement.component';

@Component({
  selector: 'app-root',
  imports: [DungeonComponent, MatCard, MatCardTitle, MatCardContent, MatCardHeader, PartyAnnouncementComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'DungeonsOfObservables';
}
