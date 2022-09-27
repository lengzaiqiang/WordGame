import { IKeyButton } from './keybutton';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-keyboard-button',
  templateUrl: './keyboard-button.component.html',
  styleUrls: ['./keyboard-button.component.css']
})
export class KeyboardButtonComponent implements OnInit {

  @Input()
  keyButtonInfor: IKeyButton;

  @Output()
  clicked = new EventEmitter<IKeyButton>();

  public get value() 
  {
    return this.keyButtonInfor.value
  }

  public get row() {
    return this.keyButtonInfor.row;
  }

  public get column()
   {
    return this.keyButtonInfor.column;
   }

  constructor() { 
    this.keyButtonInfor = {
      value: '',
      column: 0,
      row: 0
    }
  }

  ngOnInit(): void {
    console.log(this.keyButtonInfor);
  }

}
