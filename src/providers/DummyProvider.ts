import type { Organization } from "../types/Organization";
import type { Repository } from "../types/Repository";
import type { VersionControlClient } from "./VersionControlClient";

export class DummyProvider implements VersionControlClient {
  async getOrganization(organizationName: string): Promise<Organization> {
    const organization: Organization = {
      id: "fakeId",
      reposUrl: "fakeReposUrl",
      avatarUrl: "",
      followers: 0,
      following: 0,
      publicRepos: 0,
      login: organizationName,
      htmlUrl: "Dummy",
    };
    return organization;
  }

  async getRepositories(organizationName: string): Promise<Repository[]> {
    const repository: Repository = {
      id: "1",
      name: organizationName,
    };
    return [repository];
  }
  async getRepository(organizationName: string): Promise<Repository> {
    const repository: Repository = {
      id: "1",
      name: organizationName,
    };
    return repository;
  }
}
