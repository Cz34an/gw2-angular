import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseRoleDialog } from './choose-role-dialog';

describe('ChooseRoleDialog', () => {
  let component: ChooseRoleDialog;
  let fixture: ComponentFixture<ChooseRoleDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChooseRoleDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(ChooseRoleDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
