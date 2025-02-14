import { Component, OnInit, OnDestroy } from '@angular/core';
import { DungeonMasterService } from '../../services/dungeon-master.service';
import { Subscription } from 'rxjs';
import { map, filter } from 'rxjs/operators';  // RxJS operators for transformation and filtering
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-party-announcement',
  templateUrl: './party-announcement.component.html',
  styleUrls: ['./party-announcement.component.css'],
  imports: [NgForOf]  // Import NgForOf for iterating over announcements in the template
})
export class PartyAnnouncementComponent implements OnInit, OnDestroy {
  announcements: string[] = [];  // Store the announcements to display in the template
  private eventSubscription: Subscription = Subscription.EMPTY;  // Subscription to handle event stream

  constructor(private dungeonEventService: DungeonMasterService) {}

  ngOnInit(): void {
    // ngOnInit lifecycle hook: Subscribing to events emitted by the DungeonMasterService
    this.eventSubscription = this.dungeonEventService.getEvents().pipe(
      // Use `filter` to only pass events that contain certain keywords or conditions
      // In this case, we're filtering out any empty events.
      filter(event => event.length > 0),  // Only pass non-empty events to the next operator

      // Use `map` to modify the event data before it's passed to the subscription
      // Here, we're trimming any extra whitespace around the event string.
      map(event => event.trim()),  // Trim leading and trailing whitespace from the event string
    ).subscribe(event => {
      // Call the method to handle the event whenever one is received
      this.handleEvent(event);  // Handle the event by processing it based on its content
    });
  }

  ngOnDestroy(): void {
    // ngOnDestroy lifecycle hook: Unsubscribing to avoid memory leaks
    this.eventSubscription.unsubscribe();  // Ensure we unsubscribe when the component is destroyed
  }

  /**
   * handleEvent is responsible for processing each event received from the service.
   * Based on the content of the event, it will determine what type of announcement should be made.
   * @param event - The event received from the DungeonMasterService
   */
  private handleEvent(event: string): void {
    // Check if the event contains the string 'dragon'. This could represent a dragon-related event.
    switch (true) {
      case event.includes('dragon'):
        this.addAnnouncement('⚔️ The party prepares for battle with the dragon!');
        break;
      case event.includes('treasure'):
        this.addAnnouncement('💎 The party finds treasure and celebrates!');
        break;
      case event.includes('door'):
        this.addAnnouncement('🚪 The party cautiously opens a mysterious door.');
        break;
      default:
        this.addAnnouncement(`🔮 A mysterious event occurs: ${event}`);
        break;
    }
  }

  /**
   * addAnnouncement is responsible for adding a new announcement to the list.
   * The message provided is pushed into the announcements array, which is displayed in the template.
   * @param message - The message to be displayed in the announcement
   */
  private addAnnouncement(message: string): void {
    // Adds the provided message to the announcements array for display
    this.announcements.push(message);
  }
}
