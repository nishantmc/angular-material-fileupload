import { Component, OnDestroy, QueryList, Input, ContentChildren, forwardRef } from '@angular/core';
import { MatFileUpload } from './../matFileUpload/matFileUpload.component';
import { Subscription, Observable, merge } from 'rxjs';
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
  get fileUploadRemoveEvents(): Observable<MatFileUpload> {
    return merge(...this.fileUploads.map(fileUpload => fileUpload.removeEvent));
  }

  public files: Array<any> = [];

  @Input()
  public auto: boolean = false;

  /* Http request input bindings */
  @Input()
  public httpUrl: string;

  @Input()
  public httpRequestHeaders: HttpHeaders | {
    [header: string]: string | string[];
  } = new HttpHeaders();

  @Input()
  public httpRequestParams: HttpParams | {
    [param: string]: string | string[];
  } = new HttpParams();

  @Input()
  public fileAlias: string = "file";

  public ngAfterViewInit(): void {
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

  public add(file: any): void {
    this.files.push(file);
  }

  public uploadAll(): void {
    this.fileUploads.forEach((fileUpload) => { fileUpload.upload() });
  }

  public removeAll(): void {
    this.files.splice(0, this.files.length);
  }

  public ngOnDestroy(): void {
    if (this.files) {
      this.removeAll();
    }
  }

}