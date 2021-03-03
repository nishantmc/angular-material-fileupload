import { NgModule } from "@angular/core";
import { BytesPipe } from "./bytes/bytes.pipe";
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { MatFileUploadQueueComponent } from "./mat-file-upload-queue/mat-file-upload-queue.component";
import { MatFileUploadComponent } from "./mat-file-upload/mat-file-upload.component";
import { FileUploadInputForDirective } from "./file-upload-input-for/file-upload-input-for.directive";

@NgModule({
  declarations: [
    BytesPipe,
    MatFileUploadQueueComponent,
    MatFileUploadComponent,
    FileUploadInputForDirective,
  ],
  imports: [
    MatProgressBarModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    CommonModule,
  ],
  exports: [
    BytesPipe,
    MatFileUploadQueueComponent,
    MatFileUploadComponent,
    FileUploadInputForDirective,
  ],
})
export class MatFileUploadModule {}
