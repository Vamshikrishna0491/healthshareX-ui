import { TestBed } from '@angular/core/testing';

import { OsDetectService } from './os-detect.service';

describe('OsDetectService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OsDetectService = TestBed.get(OsDetectService);
    expect(service).toBeTruthy();
  });
});
