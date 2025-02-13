import { Injectable } from '@angular/core';
import {filter, interval, map, Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DungeonEventService {
  private eventSubject = new Subject<string>();
  // eventSubject: Think of this as the central Sending Stone network hub in a D&D campaign.
  // It's a magical system that allows adventurers with attuned Sending Stones to receive messages.
  //
  // = new Subject<string>(): This creates the hub itself.  It's not just a single stone, but the
  // whole system, including the magic that powers it and the person controlling it.
  //
  // Subject (Observable + manual control):
  //   - Observable: The magical connection that allows attuned Sending Stones to receive messages.
  //     It's like a magical radio wave that anyone with the right receiver can tune into. Adventurers
  //     all over the realm can "observe" (listen to) messages sent by the hub.
  //   - Manual Control: A powerful wizard or cleric at the hub decides *what* messages are sent
  //     (warnings, quest updates, news) and *when* they're sent. They're not just a passive transmitter;
  //     they actively choose the content. They can announce a dragon sighting, give details about a
  //     new quest, or warn about an approaching army.  They're in control of the broadcast.
  //
  // <string>: Specifies that the messages sent will be in the form of written scrolls containing text.
  // Imagine the wizard writing messages on parchment.
  //
  // In short: eventSubject is like the Sending Stone hub. It broadcasts messages (Observable) that
  // anyone with an attuned stone can receive, but a person (like the wizard) is actively in charge,
  // choosing what's broadcast and when (manual control). It's not just random magic; it's curated
  // information. Just like a Subject in code allows you to send data to multiple listeners, but
  // you have the power to decide what that data is and when it is sent.

  constructor() {
    interval(3000).subscribe(() => {
      const events = ['A dragon appears!', 'You find a hidden door.', 'A mimic attacks!', 'The ground shakes...', 'A Goblin appears!'];
      const randomEvent = events[Math.floor(Math.random() * events.length)];
      this.eventSubject.next(randomEvent);
    })
  }

  //getEvents():Retrieves a stream of dungeon events.  Think of this as the GM generating random events for the party.
  //@returns Observable<string>: A stream of text messages (strings) describing the events.
  getEvents(): Observable<string> {
    return this.eventSubject.asObservable().pipe( // Connect to the source of events (the GM's event list). `asObservable()` makes it read-only.
      filter(event => !event.includes('mimic')), // Filter out common/unimportant events, like yet another mimic encounter.  The GM doesn't want to bore the players.
      map(event => `🧙 Dungeon Event: ${event}`) // Enhance the event descriptions with an emoji and prefix for dramatic flair.  The GM adds some flavor to the description.
    );
  }
}
