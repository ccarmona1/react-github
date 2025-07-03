import { DummyProvider } from "./DummyProvider";

describe("DummyProvider", () => {
  let provider: DummyProvider;

  beforeEach(() => {
    provider = new DummyProvider();
  });

  it("should get organization data", async () => {
    const org = await provider.getOrganization("testOrg");
    expect(org).toEqual({
      id: "fakeId",
      reposUrl: "fakeReposUrl",
      avatarUrl: "",
      followers: 0,
      following: 0,
      publicRepos: 0,
      login: "testOrg",
      htmlUrl: "Dummy",
    });
  });

  it("should get repositories", async () => {
    const repos = await provider.getRepositories("testOrg");
    expect(repos).toEqual([
      {
        id: "1",
        name: "testOrg",
      },
    ]);
  });

  it("should get repository", async () => {
    const repo = await provider.getRepository("testOrg");
    expect(repo).toEqual({
      id: "1",
      name: "testOrg",
    });
  });
});
