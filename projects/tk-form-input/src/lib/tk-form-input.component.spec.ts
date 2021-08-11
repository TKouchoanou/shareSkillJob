import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TkFormInputComponent } from './tk-form-input.component';

describe('TkFormInputComponent', () => {
  let component: TkFormInputComponent;
  let fixture: ComponentFixture<TkFormInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TkFormInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TkFormInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
