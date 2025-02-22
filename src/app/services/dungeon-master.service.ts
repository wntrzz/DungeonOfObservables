import { Injectable } from '@angular/core';
import { filter, interval, map, Observable, Subject } from 'rxjs';

// The `@Injectable()` decorator marks the class as a service that can be injected into other components or services.
// It tells Angular that this class can have dependencies injected into it (such as other services or values).
// The `{ providedIn: 'root' }` part specifies that the service will be provided at the root level of the application.
// This means that Angular will create a single instance of the service that is shared across the entire application.
// The service will be available throughout the app without needing to be redefined in individual components.
@Injectable({
  providedIn: 'root',
})

// Services are singletons that are created once for all and stay in memory as long as the application is open
// A service is created by Angular when a component needs it for the first time.
// Then, that instance remains unique and shared between all components that inject such service.
// A service doesn’t get destroyed:
// It remains in memory as long as your app is open and you don’t close your browser or tab.
export class DungeonMasterService {
  private eventSubject = new Subject<string>();

  // `eventSubject` is an instance of `Subject<string>`, serving as both an **Observable** and an **Observer**.

  // ### What is a Subject?
  // A `Subject` in RxJS allows components to **emit** and **subscribe to** events. Unlike a standard `Observable`,
  // a `Subject` enables multicast behavior, meaning multiple subscribers receive the same emitted values.

  // ### How It Works
  // - **Emitting Events**: The `eventSubject` can send event notifications to all subscribed components.
  // - **Subscribing to Events**: Any component can listen for updates by subscribing to this subject.
  // - **Multicast Behavior**: Multiple components can subscribe and react to the same events in real time.

  // This makes `eventSubject` a powerful mechanism for managing communication between components in an Angular application.

  // constructor() {
  //   interval(6000).subscribe(() => {
  //     const events = ['A dragon appears!', 'You find a hidden door.', 'A mimic attacks!', 'The ground shakes...', 'A Goblin appears!'];
  //     const randomEvent = events[Math.floor(Math.random() * events.length)];
  //     this.eventSubject.next(randomEvent);
  //   });
  // }

  constructor() {
    // The constructor is a special method that initializes this component or service when it is created.
    //
    // ### What Happens Here?
    // - The constructor is called **before** Angular runs lifecycle hooks like `ngOnInit()`.
    // - It’s used for setting up dependencies and initializing properties.
    // - However, **avoid putting complex logic** here—use lifecycle hooks like `ngOnInit()` instead.
    //
    // ### Best Practices
    // - Use the constructor **only** for dependency injection and simple setup.
    // - Move heavy logic, API calls, or event subscriptions to lifecycle hooks like `ngOnInit()`.

    interval(6000).subscribe(() => {
      // `interval(3000)` creates a timed Observable that emits a value every 3000 milliseconds (3 seconds).

      // ### How It Works
      // - The `interval()` function acts like a **timer**, emitting values at a fixed interval.
      // - Each emitted value triggers an event, making it useful for periodic updates.

      // ### Use Case
      // - Ideal for scenarios where actions need to occur repeatedly over time, such as polling data or updating a UI.
      // - Since it runs indefinitely, always **unsubscribe** when no longer needed to prevent memory leaks.

      const events = ['A dragon appears!', 'You find a hidden door.', 'A mimic attacks!', 'The ground shakes...', 'A Goblin appears!'];

      // `randomEvent` selects a random event from the `events` array.

      const randomEvent = events[Math.floor(Math.random() * events.length)];
      // ### How It Works
      // - Uses `Math.random()` to generate a random index within the array length.
      // - Picks an event at random, ensuring dynamic and unpredictable behavior.

      // ### Use Case
      // - Useful for randomly selecting game events, notifications, or other unpredictable actions.
      // - Helps create variety and engagement in the application.

      this.eventSubject.next(randomEvent);
      // `eventSubject.next(randomEvent)` broadcasts the selected event to all subscribers.

      // ### How It Works
      // - The `next()` method pushes a new value into the `eventSubject`.
      // - Any component subscribed to `eventSubject` will receive this update in real time.

      // ### Use Case
      // - Enables communication between components by sending out events.
      // - Useful for event-driven architectures where multiple parts of the app need to react to the same event.
    });
  }

  // getEvents(): Observable<string> {
  //   return this.eventSubject.asObservable().pipe(
  //     filter(event => !event.includes('mimic')),
  //     map(event => `🧙 Dungeon Event: ${event}`)
  //   );
  // }
  // `getEvents()` allows components to **subscribe** to the events broadcasted by the service.
  // In Angular, **Observables** represent data streams, and components can **subscribe** to these streams.
  // When an event is emitted by the service (via `eventSubject.next()`), any component subscribed to this stream will **react** to the event.
  // This method provides the mechanism for other parts of the application to listen to the stream of events.
  getEvents(): Observable<string> {
    return this.eventSubject.asObservable().pipe(
      // `filter(event => !event.includes('mimic'))`: Filters out events that include 'mimic'.
      // This is useful for excluding certain events from the stream, ensuring only relevant events are passed along.
      // ### How It Works
      // - The `filter()` operator checks each event to see if it contains the word 'mimic'.
      // - If an event contains 'mimic', it is excluded from the stream.
      // - This ensures that events related to mimics won’t be broadcasted to subscribers.
      // ### Use Case:
      // - You may want to filter out specific events based on certain criteria, such as excluding certain items or situations.
      filter(event => !event.includes('mimic')),

      // `map(event => \`🧙 Event: ${event}\`)`: Adds flair to each event by prepending an emoji.
      // ### How It Works:
      // - The `map()` operator is used to transform the event data before it is sent to the subscribers.
      // - The transformation in this case adds a dramatic flair by adding an emoji at the beginning of each event.
      // ### Use Case:
      // - You can add extra formatting, like adding specific symbols or prefixes, to enhance the presentation of events.
      map(event => `🧙 Event: ${event}`)
    );
  }
}
