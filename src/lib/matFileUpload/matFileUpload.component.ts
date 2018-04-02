import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, Optional, Inject, forwardRef } from '@angular/core';
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
  export class MatFileUpload implements OnDestroy {

    constructor(
      private HttpClient: HttpClient
      ,@Inject(forwardRef(() => MatFileUploadQueue)) public matFileUploadQueue: MatFileUploadQueue
    ) {

        if(matFileUploadQueue) {
          this.httpUrl = matFileUploadQueue.httpUrl || this.httpUrl;
          this.httpRequestHeaders = matFileUploadQueue.httpRequestHeaders || this.httpRequestHeaders;
          this.httpRequestParams = matFileUploadQueue.httpRequestParams || this.httpRequestParams;
          this.fileAlias = matFileUploadQueue.fileAlias || this.fileAlias;
        }

    }

    private isUploading:boolean = false;



    /* Http request input bindings */
    @Input()
    httpUrl: string = 'http://localhost:8080';

    @Input()
    httpRequestHeaders: HttpHeaders | {
      [header: string]: string | string[];
    } = new HttpHeaders().set("Content-Type", "multipart/form-data");

    @Input()
    httpRequestParams: HttpParams | {
      [param: string]: string | string[];
    } = new HttpParams();

    @Input()
    fileAlias: string = "file";

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
    @Output() removeEvent = new EventEmitter<MatFileUpload>();
    @Output() onUpload = new EventEmitter();

    private progressPercentage: number = 0;
    public loaded: number = 0;
    private total: number = 0;
    private _file: any;
    private _id: number;
    private fileUploadSubscription: any;

    public upload(): void {
      this.isUploading = true;
      // How to set the alias?
      let formData = new FormData();
      formData.set(this.fileAlias, this._file, this._file.name);
      this.fileUploadSubscription = this.HttpClient.post(this.httpUrl, formData, {
        headers: this.httpRequestHeaders,
        observe: "events",
        params: this.httpRequestParams,
        reportProgress: true,
        responseType: "json"
      }).subscribe((event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progressPercentage = Math.floor( event.loaded * 100 / event.total );
          this.loaded = event.loaded;
          this.total = event.total;
        }
        this.onUpload.emit({ file: this._file, event: event });
      }, (error: any) => {
        if (this.fileUploadSubscription) {
          this.fileUploadSubscription.unsubscribe();
        }
        this.isUploading = false;
        this.onUpload.emit({ file: this._file, event: event });
      });
    }

    public remove(): void {
      if (this.fileUploadSubscription) {
        this.fileUploadSubscription.unsubscribe();
      }
      this.removeEvent.emit(this);
    }

    ngOnDestroy() {
      console.log('file '+ this._file.name + ' destroyed...');
    }

}