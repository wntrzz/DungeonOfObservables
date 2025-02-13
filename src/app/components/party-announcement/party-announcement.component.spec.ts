import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartyAnnouncementComponent } from './party-announcement.component';

describe('PartyAnnouncementComponent', () => {
  let component: PartyAnnouncementComponent;
  let fixture: ComponentFixture<PartyAnnouncementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartyAnnouncementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartyAnnouncementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
