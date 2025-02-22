import { Component } from "@angular/core";

import { DungeonLogComponent } from "./components/dungeon/dungeon-log.component";
import { PartyAnnouncementComponent } from "./components/party-announcement/party-announcement.component";

@Component({
  selector: "app-root",
  imports: [DungeonLogComponent, PartyAnnouncementComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  title = "DungeonsOfObservables";
}
