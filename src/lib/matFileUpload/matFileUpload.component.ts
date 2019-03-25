import { Component, EventEmitter, Input, Output, Inject, forwardRef, OnInit } from '@angular/core';
import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from '@angular/common/http';

import { MatFileUploadQueue } from '../matFileUploadQueue/matFileUploadQueue.component';

/**
 * A material design file upload component.
 */
@Component({
  selector: 'mat-file-upload',
  templateUrl: `./matFileUpload.component.html`,
  exportAs: 'matFileUpload',
  host: {
    'class': 'mat-file-upload',
  },
  styleUrls: ['./../matFileUploadQueue.scss'],
})
export class MatFileUpload implements OnInit {

  constructor(
    private HttpClient: HttpClient,
    @Inject(forwardRef(() => MatFileUploadQueue)) public matFileUploadQueue: MatFileUploadQueue
  ) {
    if (matFileUploadQueue) {
      this.httpUrl = matFileUploadQueue.httpUrl || this.httpUrl;
      this.httpRequestHeaders = matFileUploadQueue.httpRequestHeaders || this.httpRequestHeaders;
      this.httpRequestParams = matFileUploadQueue.httpRequestParams || this.httpRequestParams;
      this.fileAlias = matFileUploadQueue.fileAlias || this.fileAlias;
      this.auto = matFileUploadQueue.auto || this.auto;
    }
  }

  public isUploading: boolean = false;

  @Input()
  public auto: boolean = false;

  /* Http request input bindings */
  @Input()
  public httpUrl: string = 'http://localhost:8080';

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

  @Input()
  get file(): any {
    return this._file;
  }
  set file(file: any) {
    this._file = file;
    this.total = this._file.size;
  }

  @Input()
  set id(id: number) {
    this._id = id;
  }
  get id(): number {
    return this._id;
  }

  /** Output  */
  @Output() public removeEvent: EventEmitter<MatFileUpload> = new EventEmitter<MatFileUpload>();
  @Output() public onUpload: EventEmitter<{ file: any, event: any }> = new EventEmitter();
  @Output() public onError: EventEmitter<any> = new EventEmitter();

  public progressPercentage: number = 0;
  public loaded: number = 0;
  public total: number = 0;
  private _file: any;
  private _id: number;
  private _fileUploadSubscription: any;

  public ngOnInit(): void {
    if (this.auto) {
      this.upload();
    }
  }

  public upload(): void {
    this.isUploading = true;

    // How to set the alias?
    let formData = new FormData();
    formData.set(this.fileAlias, this._file, this._file.name);
    this._fileUploadSubscription = this.HttpClient.post(this.httpUrl, formData, {
      headers: this.httpRequestHeaders,
      observe: 'events',
      params: this.httpRequestParams,
      reportProgress: true,
      responseType: 'json'
    }).subscribe((event: any) => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progressPercentage = Math.floor(event.loaded * 100 / event.total);
        this.loaded = event.loaded;
        this.total = event.total;
      }
      this.onUpload.emit({ file: this._file, event });
    }, (error: any) => {
      if (this._fileUploadSubscription) {
        this._fileUploadSubscription.unsubscribe();
      }
      this.isUploading = false;
      this.onUpload.emit({ file: this._file, event });
      this.onError.emit(error);
    });
  }

  public remove(): void {
    if (this._fileUploadSubscription) {
      this._fileUploadSubscription.unsubscribe();
    }
    this.removeEvent.emit(this);
  }
}