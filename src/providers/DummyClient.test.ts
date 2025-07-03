import { DummyClient } from "./DummyClient";

describe("DummyClient", () => {
  let provider: DummyClient;

  beforeEach(() => {
    provider = new DummyClient();
  });

  it("should get organization data", async () => {
    const org = await provider.getOrganization("testOrg");
    expect(org).toEqual({
      id: "fakeId",
      reposUrl: "fakeReposUrl",
      avatarUrl: "",
      followers: 1,
      following: 2,
      publicRepos: 3,
      login: "testOrg",
      htmlUrl: "Dummy",
    });
  });

  it("should get repositories", async () => {
    const repos = await provider.getRepositories();
    expect(repos).toEqual([
      {
        id: "1",
        name: "My Repo 1",
        description: "This is a dummy repository",
        httpUrl: "someUrl",
        size: 200,
        openIssues: 1,
        watchers: 2,
        issuesUrl: "",
      },
    ]);
  });

  it("should get repository", async () => {
    const repo = await provider.getRepository();
    expect(repo).toEqual({
      id: "1",
      name: "My Repo 1",
      description: "This is a dummy repository",
      httpUrl: "someUrl",
      size: 200,
      openIssues: 1,
      watchers: 2,
      issuesUrl: "fakeReposUrl",
    });
  });
});
