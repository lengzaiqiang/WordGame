import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AgGridModule } from 'ag-grid-angular';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';

import { AppComponent } from './app.component';
import { DisplayBoxComponent } from './display-box/display-box.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { KeyboardButtonComponent } from './keyboard-button/keyboard-button.component';



@NgModule({
  declarations: [
    AppComponent,
    DisplayBoxComponent,
    KeyboardButtonComponent
  ],
  imports: [
    AgGridModule.withComponents(null),
    MatGridListModule,
    MatCardModule,
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
