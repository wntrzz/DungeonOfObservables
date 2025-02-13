import { TestBed } from '@angular/core/testing';

import { DungeonEventService } from './dungeon-event.service';

describe('DungeonEventService', () => {
  let service: DungeonEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DungeonEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
