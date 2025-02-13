import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {DungeonEventService} from '../../services/dungeon-event.service';
import {NgForOf, NgIf, NgOptimizedImage} from '@angular/common';
import {MatCard, MatCardContent, MatCardHeader} from '@angular/material/card';

@Component({
  selector: 'app-dungeon',
  imports: [
    NgForOf,
    NgIf,
    MatCardHeader,
    MatCard,
    MatCardContent
  ],
  templateUrl: './dungeon.component.html',
  styleUrl: './dungeon.component.css'
})
export class DungeonComponent  implements  OnInit, OnDestroy{
  events: string[] = []; //Stores received events from DungeonEventService(Dungeon Log)
  private eventSubscription!: Subscription;
  // Stores the subscription to prevent memory leaks

  constructor(private dungeonEventService: DungeonEventService){}

  ngOnInit() {
  //ngOnInit(): Lifecycle hook called after the constructor and before the view is initialized.

    this.eventSubscription = this.dungeonEventService.getEvents().subscribe(event => {
    // This is like the players tuning into the GM's announcements.  They subscribe to the stream of events.
    // this.eventSubscription: This variable stores the subscription so we can unsubscribe later to prevent memory leaks (like the players leaving the table)
    //this.dungeonEventService.getEvents(): This is the source of the events (the GM's event list).
    //.subscribe(): The players are "listening" for new events.  They're subscribing to the stream.
    //event => { ... }:  Whenever the GM announces a new event (a new message is emitted), this code block runs.
      this.events.push(event); // Add the new event to the list displayed to the user.
      // this.events.push(event): The players record the event in their log (the `this.events` array).
    });
  }

  ngOnDestroy() {
  //ngOnDestroy(): Lifecycle hook called when the component is destroyed.

    //UnSubscribe to avoid memory leaks
    this.eventSubscription.unsubscribe();
  }

}
