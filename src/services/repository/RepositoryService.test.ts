import { RepositoryService } from "./RepositoryService";

describe("RepositoryService", () => {
  const mockProvider = {
    getRepositories: jest.fn(),
    getRepository: jest.fn(),
    getRepositoryLanguages: jest.fn(),
  };
  const service = new RepositoryService(mockProvider as any);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return languages from provider", async () => {
    mockProvider.getRepositoryLanguages.mockResolvedValue({ js: 100 });
    const result = await service.getRepositoryLanguages("org", "repo");
    expect(result).toEqual({ js: 100 });
  });

  it("should return undefined if provider throws", async () => {
    mockProvider.getRepositoryLanguages.mockRejectedValue(new Error("fail"));
    const result = await service.getRepositoryLanguages("org", "repo");
    expect(result).toBeUndefined();
  });
});
