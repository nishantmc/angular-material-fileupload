import { Component, OnInit, OnDestroy, QueryList, ViewChildren, Input, ContentChildren, forwardRef } from '@angular/core';
import { MatFileUpload } from './../matFileUpload/matFileUpload.component';
import { Subscription } from 'rxjs';
import { merge } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { HttpHeaders, HttpParams } from '@angular/common/http';


/**
 * A material design file upload queue component.
 */
@Component({
    selector: 'mat-file-upload-queue',
    templateUrl: `matFileUploadQueue.component.html`,
    exportAs: 'matFileUploadQueue',
  })
  export class MatFileUploadQueue implements OnDestroy {

    @ContentChildren(forwardRef(() => MatFileUpload)) fileUploads: QueryList<MatFileUpload>;

    /** Subscription to remove changes in files. */
    private _fileRemoveSubscription: Subscription | null;

    /** Subscription to changes in the files. */
    private _changeSubscription: Subscription;

    /** Combined stream of all of the file upload remove change events. */
    get fileUploadRemoveEvents() {
        return merge(...this.fileUploads.map(fileUpload => fileUpload.removeEvent));
    }

    private files: Array<any> = [];

    /* Http request input bindings */
    @Input()
    httpUrl: string;

    @Input()
    httpRequestHeaders: HttpHeaders | {
      [header: string]: string | string[];
    } = new HttpHeaders();

    @Input()
    httpRequestParams: HttpParams | {
      [param: string]: string | string[];
    } = new HttpParams();

    @Input()
    fileAlias: string = "file";

    ngAfterViewInit() {
      // When the list changes, re-subscribe
      this._changeSubscription = this.fileUploads.changes.pipe(startWith(null)).subscribe(() => {
        if (this._fileRemoveSubscription) {
          this._fileRemoveSubscription.unsubscribe();
        }
        this._listenTofileRemoved();
      });
    }

    private _listenTofileRemoved(): void {
      this._fileRemoveSubscription = this.fileUploadRemoveEvents.subscribe((event: MatFileUpload) => {
        this.files.splice(event.id, 1);
      });
    }

    add(file: any) {
      this.files.push(file);
    }

    public uploadAll() {
      this.fileUploads.forEach((fileUpload) => { fileUpload.upload() });
    }

    public removeAll() {
      this.files.splice(0, this.files.length);
    }

    ngOnDestroy() {
      if (this.files) {
        this.removeAll();
      }
    }

}