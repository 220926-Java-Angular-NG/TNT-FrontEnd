import { TestBed } from '@angular/core/testing';

import { ResponseHandlerService } from './response-handler.service';

describe('ResponseHandlerService', () => {
  let service: ResponseHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResponseHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should handle a server error', ()=>{
    let fakeError = new ErrorEvent("Fake Error",{message:"Fake Error Message", 
      error: new ErrorEvent("Embedded Error", {message:"Embedded Error Message"})
    });
    
    service.handleError(fakeError);
    
    expect(service.responseMsg[1].includes("Embedded Error Message")).toBe(true);
  })

  it('should handle a client error', ()=>{
    let fakeError = new ErrorEvent("Fake Error",{message:"Fake Error Message"});

    service.handleError(fakeError);

    expect(service.responseMsg[1].includes("Fake Error Message")).toBe(true);
  })

  it('should handle success', ()=>{
    service.handleSuccess("fake", "success")

    expect(service.responseMsg.includes("fake")).toBe(true);
    expect(service.responseMsg.includes("success")).toBe(true);
  });

  it('should switch respPresent states', ()=>{
    let initState = service.respPresent;

    service.switchRespPresent();

    expect(initState).toBe(!service.respPresent);
  });
});
