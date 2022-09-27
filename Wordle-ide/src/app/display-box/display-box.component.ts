import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { BackGroundColor } from '../keyboard-button/keybutton';
import { IDisplayBox } from './display-box';

@Component({
  selector: 'app-display-box',
  templateUrl: './display-box.component.html',
  styleUrls: ['./display-box.component.css']
})
export class DisplayBoxComponent implements OnInit {

  @Input()
  displayInfo: IDisplayBox;

  @HostBinding('attr.data-mode')
  get state() {
    switch(this.displayInfo.bkColor)
    {
      case BackGroundColor.Default:
        return 'default';
      case BackGroundColor.BothCorrect:
        return 'letter-pos-correct';
      case BackGroundColor.LetterCorrect:
        return 'letter-correct-only'
      case BackGroundColor.NotCorrect:
          return 'not-correct'
    }
  }


  constructor() { 
    this.displayInfo = {
      value: '',
      column: 0,
      row: 0,
      bkColor: BackGroundColor.Default,
      isFilled: false
    };
  }

  ngOnInit(): void {
  }

}
