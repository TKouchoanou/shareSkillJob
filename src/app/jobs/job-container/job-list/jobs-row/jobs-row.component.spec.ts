import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsRowComponent } from './jobs-row.component';

describe('JobsRowComponent', () => {
  let component: JobsRowComponent;
  let fixture: ComponentFixture<JobsRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobsRowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobsRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
