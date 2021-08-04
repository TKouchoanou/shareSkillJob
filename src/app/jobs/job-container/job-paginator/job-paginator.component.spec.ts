import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobPaginatorComponent } from './job-paginator.component';

describe('JobPaginatorComponent', () => {
  let component: JobPaginatorComponent;
  let fixture: ComponentFixture<JobPaginatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobPaginatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobPaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
