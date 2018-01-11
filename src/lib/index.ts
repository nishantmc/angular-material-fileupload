import { NgModule } from '@angular/core';
import { MatFileUpload } from './matFileUpload/matFileUpload.component';
import { MatFileUploadQueue } from './matFileUploadQueue/matFileUploadQueue.component';
import { FileUploadInputFor } from './fileUploadInputFor.directive';

import { MatProgressBarModule, MatCardModule, MatButtonModule } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { BytesPipe } from './bytes.pipe';
import { CommonModule } from '@angular/common';


@NgModule({
  imports: [
    MatButtonModule,
    MatProgressBarModule,
    MatIconModule,
    MatCardModule,
    HttpClientModule,
    CommonModule
  ],
  declarations: [
    MatFileUpload,
    MatFileUploadQueue,
    FileUploadInputFor,
    BytesPipe
  ],
  exports: [
    MatFileUpload,
    MatFileUploadQueue,
    FileUploadInputFor,
    BytesPipe
  ]
})
export class MatFileUploadModule { }