import { GitHubProvider } from "./GitHubProvider";

describe("GitHubProvider", () => {
  let provider: GitHubProvider;

  beforeEach(() => {
    provider = new GitHubProvider();
  });

  it("should create an instance", () => {
    expect(provider).toBeTruthy();
  });

  it("should return empty array when calling getRepo", () => {
    const result = provider.getRepo("test-org");
    expect(result).toEqual([]);
  });

  it("should log organization name when calling getRepo", () => {
    const consoleSpy = jest.spyOn(console, "log");
    provider.getRepo("test-org");
    expect(consoleSpy).toHaveBeenCalledWith("test-org");
    consoleSpy.mockRestore();
  });
});
