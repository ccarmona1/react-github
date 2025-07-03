import { GitHubClient } from "./GitHubClient";
import { Octokit } from "@octokit/rest";

jest.mock("@octokit/rest");

describe("GitHubClient", () => {
  let client: GitHubClient;
  let mockGet: jest.Mock;
  let mockListForOrg: jest.Mock;

  beforeEach(() => {
    mockGet = jest.fn();
    mockListForOrg = jest.fn();
    (Octokit as unknown as jest.Mock).mockImplementation(() => ({
      rest: {
        orgs: { get: mockGet },
        repos: {
          listForOrg: mockListForOrg,
          get: mockGet,
        },
      },
    }));
    client = new GitHubClient();
  });

  describe("getOrganization", () => {
    it("should fetch and transform organization data", async () => {
      const mockResponse = {
        data: {
          id: 123,
          repos_url: "https://api.github.com/orgs/test/repos",
          avatar_url: "https://avatar.url",
          followers: 100,
          following: 50,
          public_repos: 75,
          login: "test",
          html_url: "https://github.com/test",
          blog: "https://blog.test",
          email: "test@test.com",
          twitter_username: "test",
          description: "Test org",
        },
      };

      mockGet.mockResolvedValueOnce(mockResponse);

      const result = await client.getOrganization("test");

      expect(result).toEqual({
        id: "123",
        reposUrl: mockResponse.data.repos_url,
        avatarUrl: mockResponse.data.avatar_url,
        followers: mockResponse.data.followers,
        following: mockResponse.data.following,
        publicRepos: mockResponse.data.public_repos,
        login: mockResponse.data.login,
        htmlUrl: mockResponse.data.html_url,
        blog: mockResponse.data.blog,
        email: mockResponse.data.email,
        twitterUsername: mockResponse.data.twitter_username,
        description: mockResponse.data.description,
      });
    });

    it("should handle missing optional fields", async () => {
      const mockResponse = {
        data: {
          id: 123,
          repos_url: "https://api.github.com/orgs/test/repos",
          avatar_url: "https://avatar.url",
          followers: 100,
          following: 50,
          public_repos: 75,
          login: "test",
          html_url: "https://github.com/test",
        },
      };

      mockGet.mockResolvedValueOnce(mockResponse);

      const result = await client.getOrganization("test");

      expect(result).toEqual({
        id: "123",
        reposUrl: mockResponse.data.repos_url,
        avatarUrl: mockResponse.data.avatar_url,
        followers: mockResponse.data.followers,
        following: mockResponse.data.following,
        publicRepos: mockResponse.data.public_repos,
        login: mockResponse.data.login,
        htmlUrl: mockResponse.data.html_url,
        blog: undefined,
        email: undefined,
        twitterUsername: undefined,
        description: undefined,
      });
    });

    it("should throw an error if github returns a different status than 2xx", async () => {
      mockGet.mockRejectedValueOnce(new Error("Not Found"));
      await expect(client.getOrganization("test")).rejects.toThrow(
        "Failed to fetch organization: Not Found"
      );
    });
  });

  describe("getRepositories", () => {
    it("should fetch and transform repositories data", async () => {
      const mockResponse = {
        data: [
          {
            id: 456,
            name: "repo1",
            description: "Test repo 1",
          },
          {
            id: 789,
            name: "repo2",
            description: "Test repo 2",
          },
        ],
      };

      mockListForOrg.mockResolvedValueOnce(mockResponse);

      const result = await client.getRepositories("test", {
        type: "all",
        sort: "created",
        per_page: 10,
        page: 1,
      });

      expect(result).toEqual([
        {
          id: "456",
          name: "repo1",
          description: "Test repo 1",
        },
        {
          id: "789",
          name: "repo2",
          description: "Test repo 2",
        },
      ]);
    });

    it("should handle repositories without description", async () => {
      const mockResponse = {
        data: [
          {
            id: 456,
            name: "repo1",
          },
        ],
      };

      mockListForOrg.mockResolvedValueOnce(mockResponse);

      const result = await client.getRepositories("test", {
        type: "all",
        sort: "created",
        per_page: 10,
        page: 1,
      });

      expect(result).toEqual([
        {
          id: "456",
          name: "repo1",
          description: undefined,
        },
      ]);
    });
  });

  describe("getRepository", () => {
    it("should fetch and transform repository data", async () => {
      const mockResponse = {
        data: {
          id: 456,
          name: "repo1",
          description: "Test repo 1",
        },
      };

      mockGet.mockResolvedValueOnce(mockResponse);

      const result = await client.getRepository("test", "repo1");

      expect(result).toEqual({
        id: "456",
        name: "repo1",
        description: "Test repo 1",
      });
    });

    it("should handle repository without description", async () => {
      const mockResponse = {
        data: {
          id: 456,
          name: "repo1",
        },
      };

      mockGet.mockResolvedValueOnce(mockResponse);

      const result = await client.getRepository("test", "repo1");

      expect(result).toEqual({
        id: "456",
        name: "repo1",
        description: undefined,
      });
    });
  });
});
