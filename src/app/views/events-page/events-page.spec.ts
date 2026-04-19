import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { EventControllerService } from '@/api';

import { EventsPage } from './events-page';

describe('EventsPage', () => {
  let component: EventsPage;
  let fixture: ComponentFixture<EventsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventsPage],
      providers: [
        {
          provide: EventControllerService,
          useValue: {
            getEvents: () => of([]),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EventsPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
