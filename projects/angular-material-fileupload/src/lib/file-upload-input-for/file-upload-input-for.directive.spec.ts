import { async, TestBed } from "@angular/core/testing";

import { BehaviorSubject } from "rxjs";
import { IInput } from "../mat-file-upload.type";
import { CommonModule } from "@angular/common";

import { FileUploadInputForDirective } from "./file-upload-input-for.directive";
import { Component } from "@angular/core";
@Component({
  template: ` <div
    [fileUploadInputFor]="fileUploadQueue"
    class="upload-drop-zone"
  >
    Just drag and drop files here
  </div>`,
})
class FileDropComponent {}
export class StubMatFileUploadQueueService {
  inputValueSubject = new BehaviorSubject<IInput>(null);
  inputValue$ = this.inputValueSubject.asObservable();

  initialize(input: IInput) {
    this.inputValueSubject.next(input);
  }

  getInputValue() {
    return this.inputValueSubject.getValue();
  }
}

export class StubFile {
  name = "testName";
  size = 1024;
}

describe("FileUploadInputForDirective", () => {
  let component: FileDropComponent;
  let fixture;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule],
      declarations: [FileUploadInputForDirective, FileDropComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(FileDropComponent);
    component = fixture.componentInstance;
  }));

  describe("", () => {
    it("should create", () => {
      expect(component).toBeTruthy();
    });
  });
});
