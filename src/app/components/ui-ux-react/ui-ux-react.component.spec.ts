import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiUxReactComponent } from './ui-ux-react.component';

describe('UiUxReactComponent', () => {
  let component: UiUxReactComponent;
  let fixture: ComponentFixture<UiUxReactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UiUxReactComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiUxReactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
