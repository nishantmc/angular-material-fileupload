import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { IInput } from "../mat-file-upload.type";

@Injectable()
export class MatFileUploadQueueService {
  private inputValueSubject = new BehaviorSubject<IInput>(null);
  inputValue$ = this.inputValueSubject.asObservable();

  initialize(input: IInput) {
    this.inputValueSubject.next(input);
  }

  getInputValue() {
    return this.inputValueSubject.getValue();
  }
}
