import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MatFileUploadModule } from '../lib/index';
import { MatButtonModule } from '@angular/material';


@NgModule({
  imports: [
    MatButtonModule,
    BrowserModule,
    MatFileUploadModule
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }