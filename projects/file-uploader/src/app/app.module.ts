import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { MatButtonModule } from "@angular/material";
import { MatFileUploadModule } from "angular-material-fileupload";
import {
  NoopAnimationsModule,
  BrowserAnimationsModule,
} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [AppComponent],
  imports: [MatButtonModule, BrowserModule, MatFileUploadModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
