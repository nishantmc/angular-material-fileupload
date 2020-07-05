import {
  async,
  ComponentFixture,
  TestBed,
  tick,
  fakeAsync,
} from "@angular/core/testing";

import { MatFileUploadComponent } from "./mat-file-upload.component";
import { MatFileUploadQueueService } from "../mat-file-upload-queue/mat-file-upload-queue.service";
import { BehaviorSubject, of } from "rxjs";
import { IInput } from "../mat-file-upload.type";
import {
  MatProgressBarModule,
  MatCardModule,
  MatButtonModule,
  MatIconModule,
} from "@angular/material";
import { HttpClientModule } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import { BytesPipe } from "../bytes/bytes.pipe";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";

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

describe("MatFileUploadComponent", () => {
  let component: MatFileUploadComponent;
  let fixture: ComponentFixture<MatFileUploadComponent>;
  let service: StubMatFileUploadQueueService;
  let httpTestingController: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatProgressBarModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        HttpClientModule,
        CommonModule,
        HttpClientTestingModule,
      ],
      declarations: [MatFileUploadComponent, BytesPipe],
      providers: [MatFileUploadQueueService],
    }).compileComponents();
    service = TestBed.get(MatFileUploadQueueService);

    httpTestingController = TestBed.get(HttpTestingController);
  }));

  afterEach(() => {
    httpTestingController.verify();
  });

  function initComponent() {
    fixture = TestBed.createComponent(MatFileUploadComponent);
    component = fixture.componentInstance;
  }

  describe("", () => {
    it("should create", () => {
      initComponent();
      component.file = new StubFile();
      let result;
      component.uploadProgress$.subscribe((vm) => (result = vm));
      fixture.detectChanges();
      expect(component).toBeTruthy();
      expect(result).toEqual({
        progressPercentage: 0,
        loaded: 0,
        total: 1024,
      });
    });

    it("should use the Queue inputs if inputs are not set", fakeAsync(() => {
      service.inputValueSubject.next({
        httpUrl: "http://queue.url",
        httpRequestHeaders: { queuekey: "queuevalue" },
        httpRequestParams: { queueParamkey: "queueParamValue" },
        fileAlias: "queue alias",
      });
      initComponent();
      component.file = new StubFile();
      tick();
      fixture.detectChanges();
      expect(component.httpUrl).toBe("http://queue.url");
      expect(component.httpRequestHeaders).toEqual({ queuekey: "queuevalue" });
      expect(component.httpRequestParams).toEqual({
        queueParamkey: "queueParamValue",
      });
      expect(component.fileAlias).toBe("queue alias");
    }));

    it("should NOT use the Queue inputs if inputs are set", () => {
      service.inputValueSubject.next({
        httpUrl: "http://queue.url",
        httpRequestHeaders: { queuekey: "queuevalue" },
        httpRequestParams: { queueParamkey: "queueParamValue" },
        fileAlias: "queue alias",
      });
      initComponent();
      component.file = new StubFile();
      component.httpUrl = "http://fileupload.url";
      component.httpRequestHeaders = { queuekey: "fileUploadqueuevalue" };
      component.httpRequestParams = {
        queueParamkey: "fileUploadqueueParamValue",
      };
      component.fileAlias = "file upload queue alias";
      fixture.detectChanges();

      expect(component.httpUrl).toBe("http://fileupload.url");
      expect(component.httpRequestHeaders).toEqual({
        queuekey: "fileUploadqueuevalue",
      });
      expect(component.httpRequestParams).toEqual({
        queueParamkey: "fileUploadqueueParamValue",
      });
      expect(component.fileAlias).toBe("file upload queue alias");
    });

    it("should upload", fakeAsync(() => {
      service.inputValueSubject.next({
        httpUrl: "http://queue.url",
        httpRequestHeaders: { queuekey: "queuevalue" },
        httpRequestParams: { queueParamkey: "queueParamValue" },
        fileAlias: "queue alias",
      });
      initComponent();
      component.file = new Blob();
      fixture.detectChanges();

      component.upload();
      const req = httpTestingController.expectOne(
        "http://queue.url?queueParamkey=queueParamValue"
      );

      expect(req.request.method).toEqual("POST");
      expect(req.request.headers.get("queuekey")).toEqual("queuevalue");
      expect(req.request.params.get("queueParamkey")).toEqual(
        "queueParamValue"
      );
      req.flush(null);
    }));

    it("should send remove event on remove()", fakeAsync(() => {
      service.inputValueSubject.next({
        httpUrl: "http://queue.url",
        httpRequestHeaders: { queuekey: "queuevalue" },
        httpRequestParams: { queueParamkey: "queueParamValue" },
        fileAlias: "queue alias",
      });
      initComponent();
      component.file = new Blob();
      fixture.detectChanges();
      let result;
      component.removeEvent.subscribe((vm) => (result = vm));
      component.remove();
      expect(result).toBe(component);
    }));
  });
});
