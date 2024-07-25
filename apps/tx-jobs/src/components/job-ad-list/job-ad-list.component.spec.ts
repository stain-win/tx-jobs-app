import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobAdListComponent } from './job-ad-list.component';

describe('JobAdListComponent', () => {
  let component: JobAdListComponent;
  let fixture: ComponentFixture<JobAdListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobAdListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobAdListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
