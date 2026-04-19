import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseRoleFormContent } from './choose-role-form-content';

describe('ChooseRoleFormContent', () => {
  let component: ChooseRoleFormContent;
  let fixture: ComponentFixture<ChooseRoleFormContent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChooseRoleFormContent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChooseRoleFormContent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
