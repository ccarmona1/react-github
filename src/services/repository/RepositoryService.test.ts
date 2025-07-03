import type { VersionControlClient } from "../../providers/VersionControlClient";
import { RepositoryService } from "./RepositoryService";

describe("RepositoryService", () => {
  const mockProvider: VersionControlClient = {
    getOrganization: jest.fn(),
    getRepositories: jest.fn(),
    getRepository: jest.fn(),
    getRepositoryLanguages: jest.fn(),
  };
  const service = new RepositoryService(mockProvider);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return languages from provider", async () => {
    (mockProvider.getRepositoryLanguages as jest.Mock).mockResolvedValue({
      js: 100,
    });
    const result = await service.getRepositoryLanguages("org", "repo");
    expect(result).toEqual({ js: 100 });
  });

  it("should return undefined if provider throws", async () => {
    (mockProvider.getRepositoryLanguages as jest.Mock).mockRejectedValue(
      new Error("fail")
    );
    const result = await service.getRepositoryLanguages("org", "repo");
    expect(result).toBeUndefined();
  });
});
