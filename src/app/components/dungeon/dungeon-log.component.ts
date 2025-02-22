import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DungeonMasterService } from '../../services/dungeon-master.service';
import { NgForOf } from '@angular/common';
import { MatCard, MatCardContent, MatCardHeader } from '@angular/material/card';

@Component({
  selector: 'app-dungeon-log',
  imports: [NgForOf, MatCardHeader, MatCard, MatCardContent],
  templateUrl: './dungeon-log.component.html',
  styleUrls: ['./dungeon-log.component.css'], // Corrected from styleUrl to styleUrls, as it expects an array
})
export class DungeonLogComponent implements OnInit, OnDestroy {
  events: string[] = []; // Stores the list of events that have been received from the DungeonMasterService
  private eventSubscription!: Subscription; // Subscription to handle event stream from the DungeonMasterService

  constructor(private dungeonEventService: DungeonMasterService) {}

  ngOnInit() {
    // ngOnInit lifecycle hook: Invoked after the component’s constructor and before the view is initialized.
    // Subscribing to the event stream provided by DungeonMasterService

    this.eventSubscription = this.dungeonEventService
      .getEvents() // getEvents(): Method from DungeonMasterService that provides the stream of dungeon events
      .subscribe(event => {
        // Every time the DungeonMasterService emits a new event, this callback is invoked.
        // The event is added to the `events` array, which represents the dungeon log visible to the user.

        this.events.push(event); // Adds the new event to the events array for displaying in the template
      });
  }

  ngOnDestroy() {
    // ngOnDestroy lifecycle hook: Called when the component is destroyed.
    // Used to clean up resources, such as unsubscribing from observables to avoid memory leaks.

    this.eventSubscription.unsubscribe(); // Unsubscribes from the event stream to avoid memory leaks when the component is destroyed
  }
}
