import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { MatFileUpload } from './matFileUpload.component';
import { MatProgressBarModule, MatCardModule, MatButtonModule } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { BytesPipe } from '../bytes.pipe';
import { HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { MatFileUploadQueue } from '../matFileUploadQueue/matFileUploadQueue.component';

describe('MatFileUpload', () => {


 beforeEach(() => {
   TestBed.configureTestingModule({
    imports: [
      MatButtonModule,
      MatProgressBarModule,
      MatIconModule,
      MatCardModule,
      HttpClientTestingModule
    ],
    declarations: [MatFileUpload, MatFileUploadQueue, BytesPipe],
    providers: [ {provide: HttpClient, useValue: HttpTestingController } ]
    });


 });

 it ('should work', () => {
   let fixture = TestBed.createComponent(MatFileUpload);
   expect(fixture.componentInstance instanceof MatFileUpload).toBe(true, 'should create MatFileUpload');
 });
});