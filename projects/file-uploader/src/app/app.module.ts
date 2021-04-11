import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";

import { AppComponent } from "./app.component";
import { MatFileUploadModule } from "angular-material-fileupload";

@NgModule({
  declarations: [AppComponent],
  imports: [
    MatButtonModule,
    BrowserModule,
    MatFileUploadModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
