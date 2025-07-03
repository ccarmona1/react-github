import type { Organization } from "../types/Organization";
import type { Repository } from "../types/Repository";
import type { VersionControlClient } from "./VersionControlClient";

export class DummyProvider implements VersionControlClient {
  async getOrganization(organizationName: string): Promise<Organization> {
    const organization: Organization = {
      id: "fakeId",
      reposUrl: "fakeReposUrl",
      avatarUrl: "",
      followers: 1,
      following: 2,
      publicRepos: 3,
      login: organizationName,
      htmlUrl: "Dummy",
    };
    return organization;
  }

  async getRepositories(): Promise<Repository[]> {
    const repository: Repository = {
      id: "1",
      name: "My Repo 1",
      description: "This is a dummy repository",
      httpUrl: "someUrl",
      size: 200,
      openIssues: 1,
      watchers: 2,
    };
    return [repository];
  }

  async getRepository(): Promise<Repository> {
    const repository: Repository = {
      id: "1",
      name: "My Repo 1",
      description: "This is a dummy repository",
      httpUrl: "someUrl",
      size: 200,
      openIssues: 1,
      watchers: 2,
    };
    return repository;
  }

  async getRepositoryLanguages(): Promise<Record<string, number>> {
    return { javascript: 100, python: 100 };
  }
}
