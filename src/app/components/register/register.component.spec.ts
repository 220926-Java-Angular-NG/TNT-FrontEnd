import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('RegisterFail', () =>{

    it('should create registerFail as false', () => {
      expect(component.registerFail).toBeFalse();
    })

    it('should set registerFail from false to true if onSubmit returns an error', () => {
      component.onSubmit();
      expect(component.registerFail).toBeTrue();
    })
  })
});
