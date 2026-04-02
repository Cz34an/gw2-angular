import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { EventControllerService } from '../../core/api';
import { Events } from './events';

describe('Events', () => {
  let component: Events;
  let fixture: ComponentFixture<Events>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Events],
      providers: [
        {
          provide: EventControllerService,
          useValue: {
            getEvents: () => of([]),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Events);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
