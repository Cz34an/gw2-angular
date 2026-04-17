import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildBadges } from './build-badges';

describe('BuildBadges', () => {
  let component: BuildBadges;
  let fixture: ComponentFixture<BuildBadges>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuildBadges],
    }).compileComponents();

    fixture = TestBed.createComponent(BuildBadges);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
