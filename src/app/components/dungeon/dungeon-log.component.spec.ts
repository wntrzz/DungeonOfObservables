import { ComponentFixture, TestBed } from "@angular/core/testing";

import { DungeonLogComponent } from "./dungeon-log.component";

describe("DungeonComponent", () => {
  let component: DungeonLogComponent;
  let fixture: ComponentFixture<DungeonLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DungeonLogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DungeonLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
