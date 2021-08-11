import { TestBed } from '@angular/core/testing';

import { TkFormInputService } from './tk-form-input.service';

describe('TkFormInputService', () => {
  let service: TkFormInputService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TkFormInputService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
