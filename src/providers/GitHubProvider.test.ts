import { GitHubProvider } from "./GitHubProvider";

const getOrgsMock = jest.fn();

jest.mock("@octokit/rest", () => {
  return {
    Octokit: jest.fn().mockImplementation(() => ({
      rest: {
        orgs: {
          get: getOrgsMock,
        },
      },
    })),
  };
});

describe("GitHubProvider", () => {
  let provider: GitHubProvider;

  beforeEach(() => {
    provider = new GitHubProvider();
    jest.clearAllMocks();
  });

  it("should create an instance", () => {
    expect(provider).toBeTruthy();
  });

  it("should thrown an error if github returns a different status than 2xx", async () => {
    getOrgsMock.mockRejectedValueOnce(new Error("Not Found"));
    await expect(provider.getOrganization("test-org")).rejects.toThrow(
      "Failed to fetch organization: Not Found"
    );
  });

  it("should get an organization", async () => {
    const mockedOrganization = {
      id: 1,
      repos_url: "https://api.github.com/orgs/test-org/repos",
    };
    getOrgsMock.mockResolvedValueOnce({
      status: 200,
      data: mockedOrganization,
    });
    const org = await provider.getOrganization("test-org");
    expect(org).toEqual(
      expect.objectContaining({
        id: mockedOrganization.id.toString(),
        reposUrl: mockedOrganization.repos_url,
      })
    );
  });

  it("can be constructed", () => {
    const provider = new GitHubProvider();
    expect(provider).toBeInstanceOf(GitHubProvider);
  });
});
