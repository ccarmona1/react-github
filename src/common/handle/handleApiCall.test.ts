import { handleApiCall } from "./handleApiCall";

describe("handleApiCall", () => {
  const mockSetLoading = jest.fn();

  beforeEach(() => {
    mockSetLoading.mockClear();
  });

  afterEach(jest.clearAllMocks);

  it("returns data when status is 200", async () => {
    const apiCall = jest.fn().mockResolvedValue({ status: 200, data: "ok" });
    const result = await handleApiCall(apiCall, "test", mockSetLoading);
    expect(result).toBe("ok");
    expect(mockSetLoading).toHaveBeenCalledWith(true);
    expect(mockSetLoading).toHaveBeenCalledWith(false);
  });

  it("calls setLoading without setLoading function", async () => {
    const apiCall = jest.fn().mockResolvedValue({ status: 200, data: "ok" });
    const result = await handleApiCall(apiCall, "test");
    expect(result).toBe("ok");
  });

  it("throws error when status is not 2xx and calls setLoading false", async () => {
    const apiCall = jest.fn().mockResolvedValue({ status: 404, data: null });
    await expect(
      handleApiCall(apiCall, "fail", mockSetLoading)
    ).rejects.toThrow(/Failed to fail: HttpStatus: 404/);
    expect(mockSetLoading).toHaveBeenCalledWith(true);
    expect(mockSetLoading).toHaveBeenCalledWith(false);
  });

  it("throws error and logs when apiCall throws and calls setLoading false", async () => {
    const error = new Error("fail");
    const apiCall = jest.fn().mockRejectedValue(error);
    await expect(
      handleApiCall(apiCall, "fail", mockSetLoading)
    ).rejects.toThrow(/Failed to fail: fail/);
    expect(mockSetLoading).toHaveBeenCalledWith(true);
    expect(mockSetLoading).toHaveBeenCalledWith(false);
  });
});
