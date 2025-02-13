import { Component, OnInit, OnDestroy } from '@angular/core';
import { DungeonEventService } from '../../services/dungeon-event.service';
import { Subscription } from 'rxjs';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-party-announcement',
  templateUrl: './party-announcement.component.html',
  imports: [
    NgForOf
  ],
  styleUrls: ['./party-announcement.component.css']
})
export class PartyAnnouncementComponent implements OnInit, OnDestroy {
  announcements: string[] = [];  // Store the announcements
  private eventSubscription!: Subscription;  // Subscription to the events

  constructor(private dungeonEventService: DungeonEventService) {}

  ngOnInit(): void {
    // Subscribe to dungeon events and check if the event contains a string like "dragon" or "treasure"
    this.eventSubscription = this.dungeonEventService.getEvents().subscribe(event => {
      if (event.includes('dragon')) {
        this.announcements.push('⚔️ The party prepares for battle with the dragon!');
      } else if (event.includes('treasure')) {
        this.announcements.push('💎 The party finds treasure and celebrates!');
      } else if (event.includes('door')) {
        this.announcements.push('🚪 The party cautiously opens a mysterious door.');
      }
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe to avoid memory leaks
    this.eventSubscription.unsubscribe();
  }
}
