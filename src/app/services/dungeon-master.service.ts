import { Injectable } from '@angular/core';
import { filter, interval, map, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DungeonMasterService {
  private eventSubject = new Subject<string>();

  // The `eventSubject` is like the **Dungeon Master’s voice**. It’s a **Subject** in Angular, which acts as both an **Observable** and an **Observer**.
  // A Subject can emit (send) events and can also listen for data. It’s like the DM, who controls the flow of the game by announcing events,
  // but also listens to what the players are doing (even though the players don't directly control the DM’s story).
  // The `eventSubject` is our "event stream," and anyone subscribing to it will hear the announcements, just like players listening for
  // events during a campaign. This allows **multicast behavior**, so multiple components (players) can subscribe to the same event stream.

  constructor() {
    // `interval(6000)` is like the **DM’s timer**, periodically announcing new events every 3 seconds.
    // In D&D, the DM doesn’t announce everything at once; they let the story unfold over time. This is how the **interval()** function works:
    // it emits a value every 3000 milliseconds, triggering a new event after every interval.
    // In this case, the DM is setting a **timed interval** to determine how often new events are introduced to the players.
    interval(6000).subscribe(() => {
      const events = [
        'A dragon appears!',
        'You find a hidden door.',
        'A mimic attacks!',
        'The ground shakes...',
        'A Goblin appears!'
      ];

      // `randomEvent`: The DM randomly picks an event from the list to keep the game dynamic and unexpected.
      // This is like how the Dungeon Master might randomly decide which encounter to throw at the players next — a dragon, goblin, or something else.
      const randomEvent = events[Math.floor(Math.random() * events.length)];

      // `eventSubject.next(randomEvent)`: The DM announces the event to the players.
      // This is where the **Dungeon Master** sends out the event. `eventSubject.next()` broadcasts the event to any subscriber
      // (any component that’s listening). It’s like when the DM says, “You see a dragon!” and every player hears it.
      this.eventSubject.next(randomEvent);
    });
  }

  // `getEvents()` is how components **subscribe** to the events announced by the Dungeon Master.
  // In Angular, **Observables** are used to represent data streams, and components can **subscribe** to these streams.
  // When an event is emitted by the DM (via `eventSubject.next()`), any components subscribed to this stream will **react** to it —
  // just like the players in D&D react to what the DM announces.
  // This method is the mechanism that allows other parts of the application (the players) to listen to the stream of events from the DM.

  getEvents(): Observable<string> {
    return this.eventSubject.asObservable().pipe(
      // `filter(event => !event.includes('mimic'))`: The DM filters out certain events.
      // Maybe the players are bored of mimics, so the DM decides **not to mention** them.
      // In Angular, the `filter` operator is used to only **pass certain events** along the stream and **exclude** the rest.
      // This allows the DM (or developer) to curate the events and ensure only the most exciting or relevant ones reach the players.
      // This is an example of **preprocessing** the stream of events to match the needs of the game or application.
      filter(event => !event.includes('mimic')),

      // `map(event => \`🧙 Dungeon Event: ${event}\`)`: The DM adds flair to the announcement.
      // They might add an emoji or extra description to make the event more exciting — perhaps saying “🧙 Dungeon Event: A dragon appears!”
      // The `map()` operator in Angular is used to **transform** the data before it’s passed to the subscribers.
      // The data is **enhanced** in some way (like adding dramatic emojis or changing the format) before being emitted.
      // This is like the DM giving the players extra flavor to make the game feel more immersive.
      map(event => `🧙 Dungeon Event: ${event}`)
    );
  }
}

