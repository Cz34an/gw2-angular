import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventSlot } from './event-slot';

describe('EventSlot', () => {
  let component: EventSlot;
  let fixture: ComponentFixture<EventSlot>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventSlot],
    }).compileComponents();

    fixture = TestBed.createComponent(EventSlot);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
