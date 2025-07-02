import { handleApiCall } from "./handleApiCall";

describe("handleApiCall", () => {
  afterEach(jest.clearAllMocks);

  it("returns data when status is 200", async () => {
    const apiCall = jest.fn().mockResolvedValue({ status: 200, data: "ok" });
    const result = await handleApiCall(apiCall, "test");
    expect(result).toBe("ok");
  });

  it("throws error when status is not 2xx", async () => {
    const apiCall = jest.fn().mockResolvedValue({ status: 404, data: null });
    await expect(handleApiCall(apiCall, "fail")).rejects.toThrow(
      /Failed to fail: HttpStatus: 404/
    );
  });

  it("throws error and logs when apiCall throws", async () => {
    const error = new Error("fail");
    const apiCall = jest.fn().mockRejectedValue(error);
    await expect(handleApiCall(apiCall, "fail")).rejects.toThrow(
      /Failed to fail: fail/
    );
  });
});
