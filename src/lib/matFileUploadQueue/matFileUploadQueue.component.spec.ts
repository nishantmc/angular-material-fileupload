import { TestBed } from '@angular/core/testing';

import { MatFileUploadQueue } from './matFileUploadQueue.component';

describe('MatFileUploadQueue', () => {
 beforeEach(() => {
   TestBed.configureTestingModule({ declarations: [MatFileUploadQueue]});
 });

 it ('should work', () => {
   let fixture = TestBed.createComponent(MatFileUploadQueue);
   expect(fixture.componentInstance instanceof MatFileUploadQueue).toBe(true, 'should create MatFileUploadQueue');
 });
});