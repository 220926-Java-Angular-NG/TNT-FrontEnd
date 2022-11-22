import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-ui-ux-react',
  templateUrl: './ui-ux-react.component.html',
  styleUrls: ['./ui-ux-react.component.css']
})
export class UiUxReactComponent implements OnInit {

  @Input() notice: any;
  @Input() noticeType:any;

  @Output() close = new EventEmitter<void>();

  constructor() { 
  }

  ngOnInit(): void {
   
  }

  onCloseClick(){
    this.close.emit();
  }

  

}
