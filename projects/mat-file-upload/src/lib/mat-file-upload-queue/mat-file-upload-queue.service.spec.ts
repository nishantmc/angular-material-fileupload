import { TestBed, async } from "@angular/core/testing";

import { MatFileUploadQueueService } from "./mat-file-upload-queue.service";

describe("MatFileUploadQueueService", () => {
  let service: MatFileUploadQueueService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [MatFileUploadQueueService],
    }).compileComponents();
    service = TestBed.get(MatFileUploadQueueService);
  }));

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should initialize", () => {
    expect(service.getInputValue()).toBe(null);
    service.initialize({
      fileAlias: "test",
      httpRequestHeaders: {},
      httpRequestParams: {},
      httpUrl: "test",
    });
    expect(service.getInputValue()).toEqual({
      fileAlias: "test",
      httpRequestHeaders: {},
      httpRequestParams: {},
      httpUrl: "test",
    });
  });
});
