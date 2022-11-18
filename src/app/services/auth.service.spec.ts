import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';

describe('AuthService', () => {
  let service: AuthService;
  let http: HttpClient;
  let httpController: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({});
    imports: [HttpClientTestingModule];
    providers: [AuthService];
    service = TestBed.inject(AuthService);
  http = TestBed.inject(HttpClient);
  httpController = TestBed.inject(HttpTestingController);
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should be created', () => {
    expect(service).toBeDefined();
  });
});
