import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FakeLogin } from './fake-login';

describe('FakeLogin', () => {
  let component: FakeLogin;
  let fixture: ComponentFixture<FakeLogin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FakeLogin],
    }).compileComponents();

    fixture = TestBed.createComponent(FakeLogin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
