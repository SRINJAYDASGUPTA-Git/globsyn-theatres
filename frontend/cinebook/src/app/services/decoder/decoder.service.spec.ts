import { TestBed } from '@angular/core/testing';

import { DecoderService } from './decoder.service';

describe('DecoderService', () => {
  let service: DecoderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DecoderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
