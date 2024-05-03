import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindNotifMeetingsComponent } from './find-notif-meetings.component';

describe('FindNotifMeetingsComponent', () => {
  let component: FindNotifMeetingsComponent;
  let fixture: ComponentFixture<FindNotifMeetingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FindNotifMeetingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FindNotifMeetingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
