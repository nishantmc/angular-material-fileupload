import { BytesPipe } from "./bytes.pipe";

describe("BytesPipe", () => {
  let pipe = new BytesPipe();

  it("transforms NAN to -", () => {
    expect(pipe.transform(NaN)).toBe("-");
  });

  it("transforms 0 to 0", () => {
    expect(pipe.transform(0)).toBe("0");
  });

  it("transforms 1024 to 1.0 KB", () => {
    expect(pipe.transform(1024)).toBe("1.0 KB");
  });

  it("transforms 1024*1024 to 1.0 MB", () => {
    expect(pipe.transform(1024 * 1024)).toBe("1.0 MB");
  });

  it("transforms 1024*1024*1024 to 1.0 GB", () => {
    expect(pipe.transform(1024 * 1024 * 1024)).toBe("1.0 GB");
  });

  it("transforms 1024*1024*1024*1024 to 1.0 TB", () => {
    expect(pipe.transform(1024 * 1024 * 1024 * 1024)).toBe("1.0 TB");
  });

  it("transforms 1024*1024*1024*1024*1024 to 1.0 PB", () => {
    expect(pipe.transform(1024 * 1024 * 1024 * 1024 * 1024)).toBe("1.0 PB");
  });
});
