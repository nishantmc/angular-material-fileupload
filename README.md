# angular-material-fileupload [![npm version](https://badge.fury.io/js/angular-material-fileupload.svg)](https://badge.fury.io/js/angular-material-fileupload)

A fileupload component based on angular-material design

# Documentation

[angular-material-fileupload API doc](https://nishantmc.github.io/angular-material-fileupload.github.io/)

# Demo

# Setup

The module to be imported is "MatFileUploadModule"

```Typescript

import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material';

import { AppComponent } from './app.component';
import { MatFileUploadModule } from 'angular-material-fileupload';

@NgModule({
  imports: [
    MatButtonModule,
    BrowserModule,
    MatFileUploadModule
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }

```

# File upload Example

![Screenshot](SingleFileDemo.gif)

```HTML
<label for="singleFile">Upload file</label>
<input id="singleFile" type="file" [fileUploadInputFor]= "fileUploadQueue"/>
<br>

<mat-file-upload-queue #fileUploadQueue
    [fileAlias]="'file'"
    [httpUrl]="'http://localhost:8180/jax-rs-jersey-application-sample'">

    <mat-file-upload [file]="file" [id]="i" *ngFor="let file of fileUploadQueue.files; let i = index"></mat-file-upload>
</mat-file-upload-queue>
```

**Notes**

- 'fileUploadQueue' is the template input variable which point to the queue. You can see its created in the queue tag (#fileUploadQueue). Basically pointing the input to the queue
- fileAlias and httpUrl are input variables which you can bind. 'fileAlias' - as you might guess just the alias of the file. and 'httpUrl' is the url you want to do POST with multipart data.

# Drag and drop example

![Screenshot](DragAndDropDemo.gif)

```HTML

<div [fileUploadInputFor]="fileUploadQueue" class="upload-drop-zone">
    Just drag and drop files here
</div>


<div style="width: 500px">
    <mat-file-upload-queue #fileUploadQueue
        [fileAlias]="'file'"
        [httpUrl]="'http://localhost:8180/jax-rs-jersey-application-sample'" multiple>

        <mat-file-upload [file]="file" [id]="i" *ngFor="let file of fileUploadQueue.files; let i = index"></mat-file-upload>
    </mat-file-upload-queue>
</div>

```

# Example setting the inputs on mat-file-upload-queue

```HTML

<div [fileUploadInputFor]="fileUploadQueue3" class="upload-drop-zone">
  Just drag and drop files here
</div>

<div style="width: 500px">
  <mat-file-upload-queue
    #fileUploadQueue3
    [httpUrl]="'http://localhost:8080/jax-rs-jersey-application-sample'"
    fileAlias="{{ fileAlias }}"
    [httpRequestHeaders]="httpRequestHeaders"
    [httpRequestParams]="httpRequestParams"
  >
    <mat-file-upload
      [file]="file"
      [id]="i"
      *ngFor="let file of fileUploadQueue3.files; let i = index"
    ></mat-file-upload>
  </mat-file-upload-queue>
</div>

```

# Example setting the inputs overridden on mat-file-upload

```HTML

<div [fileUploadInputFor]="fileUploadQueue4" class="upload-drop-zone">
  Just drag and drop files here
</div>

<div style="width: 500px">
  <mat-file-upload-queue
    #fileUploadQueue4
    [httpUrl]="'http://localhost:8080/jax-rs-jersey-application-sample1'"
    fileAlias="{{ fileAlias }}"
    [httpRequestHeaders]="httpRequestHeaders"
    [httpRequestParams]="httpRequestParams"
  >
    <mat-file-upload
      [file]="file"
      [id]="i"
      *ngFor="let file of fileUploadQueue4.files; let i = index"
      [httpUrl]="'http://localhost:8080/jax-rs-jersey-application-sample'"
      fileAlias="{{ fileAlias1 }}"
      [httpRequestHeaders]="httpRequestHeaders1"
      [httpRequestParams]="httpRequestParams1"
    ></mat-file-upload>
  </mat-file-upload-queue>
</div>


```
