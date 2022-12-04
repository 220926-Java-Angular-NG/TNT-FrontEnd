import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiUxReactComponent } from './ui-ux-react.component';

describe('UiUxReactComponent', () => {
  let testHostComponent:TestHostComponent;
  let testHostFixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UiUxReactComponent, TestHostComponent ]
    })
    .compileComponents();
    });
  
  beforeEach(()=>{
    testHostFixture = TestBed.createComponent(TestHostComponent);
    testHostComponent = testHostFixture.componentInstance;
    testHostFixture.detectChanges();
  });

  it('should create alert on successful login', () => {
    
    testHostFixture.detectChanges();

    expect(testHostFixture.debugElement.nativeElement.querySelector('div').innerText).toContain('Success');
  });

  @Component({
    selector: `host-component`,
    template: `<app-ui-ux-react [notice]="notice" [noticeType]="noticeType"></app-ui-ux-react>`
  })
  class TestHostComponent{
    @ViewChild(UiUxReactComponent)
    public uiuxcomponent!: UiUxReactComponent;
    public notice:string[] = ['200', 'Success'];
    public noticeType:string = 'success';

  }
});
